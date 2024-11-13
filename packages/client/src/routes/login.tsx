import { type ReactNode, useEffect } from 'react';
import { client } from '@/api/client';
import { SolidButton } from '@/components/buttons/solid-button';
import { LoginForm } from '@/components/login-form';

async function logout() {
    const api = client();

    await api.delete('api/auth');
}

export function Login(): ReactNode {
    useEffect(() => {
        async function getMe() {
            const api = client();

            try {
                const data = api.get('api/auth').json();
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }

        void getMe();
    }, []);

    return (
        <div>
            <LoginForm />
            <SolidButton onClick={logout}>Logout</SolidButton>
        </div>
    );
}
