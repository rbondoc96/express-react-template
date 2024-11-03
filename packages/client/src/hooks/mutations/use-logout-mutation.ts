import { useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '@/api/client';
import { invalidateMeQuery } from '@/hooks/queries/use-me-query';

export function useLogoutMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            const api = client();

            await api.delete('api/auth');
        },
        onSuccess: async () => {
            await invalidateMeQuery(queryClient);
        },
    });
}
