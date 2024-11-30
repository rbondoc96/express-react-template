type RouteName<P extends string> = {
    name: symbol;
    path: P;
};

function Route<P extends string>(name: symbol, path: P): RouteName<P> {
    return {
        name,
        path,
    };
}

export const ROUTE_ADMIN_DASHBOARD = Route(Symbol('admin'), '/admin');
export const ROUTE_ADMIN_USERS = Route(Symbol('admin.users'), '/admin/users');
export const ROUTE_DASHBOARD = Route(Symbol('dashboard'), '/dashboard');
export const ROUTE_LOGIN = Route(Symbol('login'), '/login');
export const ROUTE_REGISTER = Route(Symbol('register'), '/register');
export const ROUTE_ROOT = Route(Symbol('root'), '/');
export const ROUTE_SETTINGS = Route(Symbol('settings'), '/settings');
