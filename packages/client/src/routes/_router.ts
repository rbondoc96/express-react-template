import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '@/layouts/root-layout';
import { ROUTE_ROOT } from '@/routes/_names';
import { Root } from '@/routes/root';

export const router = createBrowserRouter([
    {
        Component: RootLayout,
        children: [
            {
                path: ROUTE_ROOT.path,
                Component: Root,
            },
        ],
    },
]);
