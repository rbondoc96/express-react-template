import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '@/layouts/root-layout';
import { ROUTE_LOGIN, ROUTE_REGISTER, ROUTE_ROOT } from '@/routes/_names';
import { Login } from '@/routes/login';
import { Register } from '@/routes/register';
import { Root } from '@/routes/root';

export const router = createBrowserRouter([
    {
        Component: RootLayout,
        children: [
            {
                path: ROUTE_ROOT.path,
                Component: Root,
            },
            {
                path: ROUTE_REGISTER.path,
                Component: Register,
            },
            {
                path: ROUTE_LOGIN.path,
                Component: Login,
            },
        ],
    },
]);
