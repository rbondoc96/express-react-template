import * as React from 'react';

type ListShellProps = React.PropsWithChildren<{
    error?: unknown;
    items: unknown[];
}>;

export function ListShell({ children, error, items }: ListShellProps): React.ReactNode {
    if (items.length <= 0) {
        return (
            <div>
                <span>No results.</span>
            </div>
        );
    }

    if (error !== undefined && error !== null) {
        return (
            <div>
                <span>There was an error.</span>
            </div>
        );
    }

    return <div>{children}</div>;
}
