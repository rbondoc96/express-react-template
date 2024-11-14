import { type QueryClient, useQuery } from '@tanstack/react-query';
import { client } from '@/api/client';
import { type User, userParser } from '@/api/parsers/userParser';
import { unwrap } from '@/api/parsers/utilities/unwrap';

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
                return unwrap(userParser).parse(data);
            } catch (error) {
                console.error(error);
                return null;
            }
        },
    });
}
