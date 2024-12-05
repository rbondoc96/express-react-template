import { type ReactNode } from 'react';
import { Link } from '@/components/ui/link';

export function Root(): ReactNode {
    return (
        <div className="container flex flex-col justify-between px-8">
            <header className="my-6">
                <div className="flex justify-between">
                    <Link to="/">Home</Link>
                </div>
            </header>
            <main>
                <div className="min-h-screen flex flex-col gap-4">
                    <div className="flex flex-col items-center">
                        <h1 className="text-4xl font-semibold">Express + React Template</h1>
                    </div>
                    <Link to="/register" variant="solid-button">
                        Sign Up
                    </Link>
                    <Link to="/login" variant="solid-button">
                        Login
                    </Link>
                </div>
            </main>
        </div>
    );
}
