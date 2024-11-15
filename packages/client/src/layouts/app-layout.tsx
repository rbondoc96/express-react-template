import { type ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useMeQuery } from '@/hooks/queries/use-me-query';

export function AppLayout(): ReactNode {
    const { data: user } = useMeQuery();

    if (!user) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
}
