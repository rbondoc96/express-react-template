import { type ReactNode, useEffect, useState } from 'react';

export function Root(): ReactNode {
    const [message, setMessage] = useState('');

    useEffect(() => {
        async function getMessage() {
            const response = await fetch('/api/hello');
            const data = await response.json();

            console.log(data);

            setMessage(data?.message);
        }

        void getMessage().catch(() => console.log('error in server'));
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex flex-col items-center">
                <h1 className="text-4xl font-semibold">React Template</h1>
            </div>
            <p className="flex gap-2">
                <span>From Server: </span>
                <span>{message}</span>
            </p>
        </div>
    );
}
