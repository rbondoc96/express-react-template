import { useQuery, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { array } from 'zod';
import { client } from '@/api/client';
import { userValidator } from '@/api/validators/user-validator';
import { unwrap } from '@/api/validators/utilities/unwrap';

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
        return unwrap(array(userValidator)).parse(data);
    };
}

export function useInvalidateUserListQueries() {
    const queryClient = useQueryClient();

    return async () => {
        await queryClient.invalidateQueries({
            queryKey: userListQueryKey({}),
        });
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
