import { type ReactNode } from 'react';
import { client } from '@/api/client';
import { SolidButton } from '@/components/buttons/solid-button';
import { Link } from '@/components/ui/link';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export function Root(): ReactNode {
    const getUsers = async () => {
        const api = client();

        try {
            const responseData = await api
                .get('api/auth/users', {
                    searchParams: {
                        page: 1,
                        per_page: 10,
                    },
                })
                .json();

            console.log(responseData);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container flex flex-col justify-between px-8">
            <header className="my-6">
                <div className="flex justify-between">
                    <Link to="/">Home</Link>
                    <ThemeToggle />
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
                    <SolidButton onClick={getUsers}>Get Users</SolidButton>
                </div>
            </main>
        </div>
    );
}
