import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type ReactNode } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes/_router';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            staleTime: 30_000,
        },
    },
});

export function App(): ReactNode {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            {/*<ReactQueryDevtools initialIsOpen={false} />*/}
        </QueryClientProvider>
    );
}
