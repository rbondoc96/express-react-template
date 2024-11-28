import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import * as React from 'react';
import { IconButton } from '@/components/buttons/icon-button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { type Theme, useSetTheme, useTheme } from '@/hooks/use-local-store';

function getSystemTheme(): Exclude<Theme, 'system'> {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme: Theme): void {
    const targetTheme = theme === 'system' ? getSystemTheme() : theme;

    // Toggling the `no-transition` class defined in `index.scss` makes it so that
    // any of its descendants won't animate when the `dark` class is added or removed.
    document.body.classList.add('no-transition');
    document.documentElement.classList.toggle('dark', targetTheme === 'dark');
    setTimeout(() => document.body.classList.remove('no-transition'), 100);
}

export function ThemeToggle(): React.ReactNode {
    const theme = useTheme();
    const setTheme = useSetTheme();
    const appliedTheme = theme !== 'system' ? theme : getSystemTheme() === 'dark' ? 'dark' : 'light';

    React.useEffect(() => {
        applyTheme(theme);
    }, [theme]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <IconButton className="text-gray-500">
                    {appliedTheme === 'dark' ? <MoonIcon /> : <SunIcon />}
                </IconButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
