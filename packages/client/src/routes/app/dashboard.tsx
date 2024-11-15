import { type ReactNode } from 'react';
import { SolidButton } from '@/components/buttons/solid-button';
import { useLogoutMutation } from '@/hooks/mutations/use-logout-mutation';

export function Dashboard(): ReactNode {
    const { mutateAsync: logout } = useLogoutMutation();

    return (
        <div>
            <h1>Dashboard</h1>
            <SolidButton onClick={async () => await logout()}>Sign Out</SolidButton>
        </div>
    );
}
