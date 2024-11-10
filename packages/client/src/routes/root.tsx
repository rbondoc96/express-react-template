import { type ReactNode, useEffect, useState } from 'react';
import { client } from '@/api/client';
import { SolidButton } from '@/components/buttons/solid-button';
import { Link } from '@/components/link';

export function Root(): ReactNode {
    const [message, setMessage] = useState('');

    useEffect(() => {
        async function getMessage() {
            const api = client();
            const data: { message: string } = await api.get('api/hello').json();

            setMessage(data.message);
        }

        void getMessage().catch(() => console.log('error in server'));
    }, []);

    const getUsers = async () => {
        console.log('get users');

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
            <div className="flex justify-center">
                <div className="border px-4 py-3 rounded">
                    <span>From Server: </span>
                    <code className="bg-gray-200 px-2 py-1 rounded">{message}</code>
                </div>
            </div>
            <Link to="/register" variant="solid-button">
                Sign Up
            </Link>
            <SolidButton onClick={getUsers}>Get Users</SolidButton>
        </div>
    );
}
