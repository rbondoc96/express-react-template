import { HomeIcon, ReloadIcon } from '@radix-ui/react-icons';
import { type ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Link } from '@/components/link';
import { useMeQuery } from '@/hooks/queries/use-me-query';

// Fetch on render vs render on fetch?
export function AuthLayout(): ReactNode {
    const { data: user, isPending } = useMeQuery();

    // When refreshing, this shows for a quick second.
    if (isPending) {
        return <ReloadIcon />;
    }

    if (user) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <div className="flex min-h-screen">
            <div className="flex-1 bg-gray-500" />
            <div className="flex-1">
                <div className="h-full p-6">
                    <div className="flex flex-col items-center">
                        <Link className="my-8" to="/">
                            <HomeIcon className="h-8 w-8" />
                        </Link>
                        <div className="self-stretch">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
