import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { array } from 'zod';
import { client } from '@/api/client';
import { userParser } from '@/api/parsers/userParser';
import { unwrap } from '@/api/parsers/utilities/unwrap';

type PaginationParams = Partial<{
    page: number;
    per_page: number;
}>;

const userListQueryKey = (queryParams: PaginationParams) => ['users', queryParams] as const;

function userListQueryFn(queryParams: PaginationParams) {
    return async () => {
        const api = client();

        const searchParams = {
            page: queryParams.page ?? 1,
            per_page: queryParams.per_page ?? 10,
        };

        await new Promise((resolve) => setTimeout(resolve, 2000));
        const data = await api.get('api/users', { searchParams }).json();
        return unwrap(array(userParser)).parse(data);
    };
}

export function useUserListQuery(queryParams: PaginationParams = {}) {
    const searchParams = {
        page: queryParams.page ?? 1,
        per_page: queryParams.per_page ?? 10,
    };

    return useQuery({
        queryKey: userListQueryKey(searchParams),
        queryFn: userListQueryFn(searchParams),
    });
}

export function useUserListSuspenseQuery(queryParams: PaginationParams = {}) {
    const searchParams = {
        page: queryParams.page ?? 1,
        per_page: queryParams.per_page ?? 10,
    };

    return useSuspenseQuery({
        queryKey: userListQueryKey(searchParams),
        queryFn: userListQueryFn(searchParams),
    });
}
