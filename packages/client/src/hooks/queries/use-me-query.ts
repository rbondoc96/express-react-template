import { type QueryClient, useQuery } from '@tanstack/react-query';
import { client } from '@/api/client';
import { type User, userValidator } from '@/api/validators/user-validator';
import { unwrap } from '@/api/validators/utilities/unwrap';

const meQueryKey = () => ['me'] as const;

export function setMeQueryData(queryClient: QueryClient, data: User) {
    queryClient.setQueryData(meQueryKey(), data);
}

export async function invalidateMeQuery(queryClient: QueryClient) {
    await queryClient.invalidateQueries({
        queryKey: meQueryKey(),
    });
}

export function useMeQuery() {
    return useQuery({
        queryKey: meQueryKey(),
        queryFn: async () => {
            const api = client();

            try {
                const data = await api.get('api/auth').json();
                return unwrap(userValidator).parse(data);
            } catch (error) {
                console.error(error);
                return null;
            }
        },
    });
}
