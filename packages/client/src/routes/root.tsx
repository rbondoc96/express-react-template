import { ReactNode } from 'react';
import { Link } from '@/components/ui/link';

export function Root(): ReactNode {
    return (
        <div className="flex flex-col">
            <header className="container py-5 border-b">
                <div className="flex justify-between">
                    <Link className="text-sm" to="/">
                        Home
                    </Link>
                    <Link className="text-sm" to="/login">
                        Log in
                    </Link>
                </div>
            </header>
            <main className="container flex flex-col mt-19">
                <div className="min-h-screen flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-8">
                        <h1 className="text-5xl font-bold">Express + React Template</h1>
                        <p className="text-xl">A template for projects written with React and Express.</p>
                    </div>
                    <div className="flex justify-center">
                        <Link to="/register" variant="solid-button">
                            Get started
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
