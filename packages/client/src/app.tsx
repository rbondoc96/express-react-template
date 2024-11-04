import { type ReactNode } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes/_router';

export function App(): ReactNode {
    return <RouterProvider router={router} />;
}
