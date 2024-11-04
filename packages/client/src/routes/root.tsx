import { type ReactNode } from 'react';

export function Root(): ReactNode {
    return (
        <div className="min-h-screen flex">
            <div className="flex-1 flex flex-col items-center">
                <h1 className="text-4xl font-semibold">React Template</h1>
            </div>
        </div>
    );
}
