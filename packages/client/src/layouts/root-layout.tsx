import { type ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { Link } from '@/components/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { useMeQuery } from '@/hooks/queries/use-me-query';

export function RootLayout(): ReactNode {
    useMeQuery();

    return (
        <div className="container flex flex-col justify-between px-8">
            <header className="my-6">
                <div className="flex justify-between">
                    <Link to="/">Home</Link>

                    <ThemeToggle />
                </div>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
}
