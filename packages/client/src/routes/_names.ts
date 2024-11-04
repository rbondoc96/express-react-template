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

export const ROUTE_ROOT = Route(Symbol('root'), '/');
