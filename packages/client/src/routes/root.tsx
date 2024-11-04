import { type ReactNode, useEffect, useState } from 'react';
import { client } from '@/api/client';

export function Root(): ReactNode {
    const [message, setMessage] = useState('');

    useEffect(() => {
        async function getMessage() {
            const api = client();
            const data: { message: string } = await api.get('api/hello').json();

            console.log(data);

            setMessage(data.message);
        }

        void getMessage().catch(() => console.log('error in server'));
    }, []);

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
        </div>
    );
}
