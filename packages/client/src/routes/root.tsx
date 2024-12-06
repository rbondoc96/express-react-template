import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from '@/components/ui/link';

export function Root(): ReactNode {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="container py-5 shadow-sm">
                <nav className="flex justify-between">
                    <Link className="text-sm" to="/">
                        Home
                    </Link>
                    <ul>
                        <li>
                            <Link className="text-sm" to="/login">
                                Log in
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <main>
                <section className="container flex flex-col gap-8 py-19 bg-gray-100">
                    <div className="flex flex-col items-center gap-8">
                        <h1 className="text-4xl md:text-5xl font-bold">Express + React Template</h1>
                        <p className="text-xl text-gray-600">A template for projects written with React and Express.</p>
                    </div>
                    <div className="flex justify-center">
                        <Button asChild>
                            <Link to="/register">Get Started</Link>
                        </Button>
                    </div>
                </section>
            </main>
            <footer className="bg-gray-800 py-8">
                <div className="container">
                    <div className="mt-8 pt-8 border-t border-gray-700 text-center">
                        <p className="text-gray-400">
                            &copy; {new Date().getFullYear()} Rodrigo Bondoc. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
