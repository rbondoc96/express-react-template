import * as React from 'react';
import { ApplicationShell, type HeaderConfig } from '@/components/shells/application-shell';

export function Settings(): React.ReactNode {
    const headerConfig: HeaderConfig = {
        breadcrumbs: [
            { label: 'Settings', to: '/settings' },
            { label: 'Theme', to: '/settings' },
        ],
    };

    return (
        <ApplicationShell headerConfig={headerConfig}>
            <h1>Settings</h1>
        </ApplicationShell>
    );
}
