import { type ReactNode } from 'react';
import { Alert } from '@/components/alert';

type AlertFromErrorProps = {
    error: unknown;
};

export function AlertFromError({ error }: AlertFromErrorProps): ReactNode {
    const message = error instanceof Error ? error.message : 'Something went wrong.';

    return <Alert description={message} title="Error" variant="error" />;
}
