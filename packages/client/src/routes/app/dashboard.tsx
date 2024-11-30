import { type ReactNode } from 'react';
import { ApplicationShell } from '@/components/shells/application-shell';

export function Dashboard(): ReactNode {
    return (
        <ApplicationShell>
            <h1>Dashboard</h1>
        </ApplicationShell>
    );
}
