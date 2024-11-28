import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '@/routes/_layouts/app-layout';
import { AuthLayout } from '@/routes/_layouts/auth-layout';
import { ROUTE_DASHBOARD, ROUTE_LOGIN, ROUTE_REGISTER, ROUTE_ROOT, ROUTE_SETTINGS } from '@/routes/_names';
import { Dashboard } from '@/routes/app/dashboard';
import { Settings } from '@/routes/app/settings';
import { Login } from '@/routes/login';
import { Register } from '@/routes/register';
import { Root } from '@/routes/root';

export const router = createBrowserRouter([
    {
        path: ROUTE_ROOT.path,
        Component: Root,
    },
    {
        Component: AuthLayout,
        children: [
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
    {
        Component: AppLayout,
        children: [
            {
                path: ROUTE_DASHBOARD.path,
                Component: Dashboard,
            },
            {
                path: ROUTE_SETTINGS.path,
                Component: Settings,
            },
        ],
    },
]);
