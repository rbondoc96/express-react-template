import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type Theme = 'dark' | 'light' | 'system';

type LocalStore = {
    theme: Theme;
    setTheme: (appTheme: Theme) => void;
};

const useLocalStore = create(
    persist<LocalStore>(
        (set) => ({
            theme: 'system',
            setTheme: (appTheme: Theme) => set({ theme: appTheme }),
        }),
        {
            name: 'local-store',
            storage: createJSONStorage(() => localStorage),
        },
    ),
);

export const useTheme = () => useLocalStore((state) => state.theme);
export const useSetTheme = () => useLocalStore((state) => state.setTheme);
export default useLocalStore;
