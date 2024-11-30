import { Permission } from '@common/enums/Permission';
import { useMeQuery } from '@/hooks/queries/use-me-query';

export function useHasPermission(permission: Permission): boolean {
    const { data: user } = useMeQuery();

    return Boolean(user?.permissions?.includes(permission));
}
