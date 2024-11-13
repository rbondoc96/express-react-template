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

export const ROUTE_LOGIN = Route(Symbol('login'), '/login');
export const ROUTE_REGISTER = Route(Symbol('register'), '/register');
export const ROUTE_ROOT = Route(Symbol('root'), '/');
