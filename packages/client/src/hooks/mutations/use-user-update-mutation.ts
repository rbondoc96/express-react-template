import { Role } from '@common/enums/Role';
import { useMutation } from '@tanstack/react-query';
import { client } from '@/api/client';
import { User, userValidator } from '@/api/validators/user-validator';
import { unwrap } from '@/api/validators/utilities/unwrap';
import { useInvalidateUserListQueries } from '@/hooks/queries/use-user-list-query';

export type UserUpdatePayload = Partial<{
    email: string;
    first_name: string;
    last_name: string;
    role: Role;
}>;

type UserUpdateArguments = {
    route: {
        userId: User['id'];
    };
    payload: UserUpdatePayload;
};

export function useUserUpdateMutation() {
    const api = client();
    const invalidateUserListQueries = useInvalidateUserListQueries();

    return useMutation({
        mutationFn: async (args: UserUpdateArguments) => {
            const response = await api.patch(`api/users/${args.route.userId}`, {
                json: args.payload,
            });
            const payload = await response.json();

            return unwrap(userValidator).parse(payload);
        },
        onSuccess: async () => {
            await invalidateUserListQueries();
        },
    });
}
