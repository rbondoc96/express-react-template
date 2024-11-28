import { QueryClientProvider } from '@tanstack/react-query';
import { type ReactNode } from 'react';
import { RouterProvider } from 'react-router-dom';
import { queryClient } from '@/queryClient';
import { router } from '@/routes/_router';

export function App(): ReactNode {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            {/*<ReactQueryDevtools initialIsOpen={false} />*/}
        </QueryClientProvider>
    );
}
