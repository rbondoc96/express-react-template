import { type ReactNode } from 'react';
import { SolidButton } from '@/components/buttons/solid-button';
import { LoginForm } from '@/components/login-form';
import { useLogoutMutation } from '@/hooks/mutations/use-logout-mutation';

export function Login(): ReactNode {
    const { mutateAsync: logout } = useLogoutMutation();

    return (
        <div>
            <LoginForm />
            <SolidButton onClick={async () => await logout()}>Logout</SolidButton>
        </div>
    );
}
