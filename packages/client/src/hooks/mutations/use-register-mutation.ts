import { useMutation, useQueryClient } from '@tanstack/react-query';
import { object, type output, string } from 'zod';
import { client } from '@/api/client';
import { userValidator } from '@/api/validators/user-validator';
import { unwrap } from '@/api/validators/utilities/unwrap';
import { setMeQueryData } from '@/hooks/queries/use-me-query';

export const registerPayloadSchema = object({
    email: string(),
    first_name: string(),
    last_name: string(),
    password: string(),
});

export type RegisterPayload = output<typeof registerPayloadSchema>;

export function useRegisterMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: RegisterPayload) => {
            const api = client();

            const data = await api
                .post('api/auth/register', {
                    json: payload,
                })
                .json();

            return unwrap(userValidator).parse(data);
        },
        onSuccess: async (data) => {
            setMeQueryData(queryClient, data);
        },
    });
}
