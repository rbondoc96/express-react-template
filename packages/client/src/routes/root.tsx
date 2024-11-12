import { type ReactNode } from 'react';
import { client } from '@/api/client';
import { SolidButton } from '@/components/buttons/solid-button';
import { Link } from '@/components/link';

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
        <div className="min-h-screen flex flex-col gap-4">
            <div className="flex flex-col items-center">
                <h1 className="text-4xl font-semibold">Express + React Template</h1>
            </div>
            <Link to="/register" variant="solid-button">
                Sign Up
            </Link>
            <SolidButton onClick={getUsers}>Get Users</SolidButton>
        </div>
    );
}
