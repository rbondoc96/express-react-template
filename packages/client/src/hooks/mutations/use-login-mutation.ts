import { useMutation, useQueryClient } from '@tanstack/react-query';
import { object, type output, string } from 'zod';
import { client } from '@/api/client';
import { userValidator } from '@/api/validators/user-validator';
import { unwrap } from '@/api/validators/utilities/unwrap';
import { setMeQueryData } from '@/hooks/queries/use-me-query';

export const loginPayloadSchema = object({
    username: string(),
    password: string(),
});

export type LoginPayload = output<typeof loginPayloadSchema>;

export function useLoginMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: LoginPayload) => {
            const api = client();

            const data = await api
                .post('api/auth/login', {
                    json: payload,
                })
                .json();

            return unwrap(userValidator).parse(data);
        },
        onSuccess: (data) => {
            setMeQueryData(queryClient, data);
        },
    });
}
