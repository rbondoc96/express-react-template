import { Role } from '@common/enums/Role';
import { useMutation } from '@tanstack/react-query';
import { client } from '@/api/client';
import { User, userParser } from '@/api/parsers/userParser';
import { unwrap } from '@/api/parsers/utilities/unwrap';
import { useInvalidateUserListQueries } from '@/hooks/queries/use-user-list-query';

export type UserUpdatePayload = Partial<{
    first_name: string;
    last_name: string;
    role: Role;
    username: string;
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

            return unwrap(userParser).parse(payload);
        },
        onSuccess: async () => {
            await invalidateUserListQueries();
        },
    });
}
