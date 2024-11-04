import { type ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeToggle } from '@/components/theme-toggle';

export function RootLayout(): ReactNode {
    return (
        <div className="container flex flex-col justify-between px-8">
            <header className="my-6">
                <div className="flex justify-end">
                    <ThemeToggle />
                </div>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
}
