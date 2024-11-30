import { Permission } from '@common/enums/Permission';
import { Role } from '@common/enums/Role';

type RoleConfig = Record<Role, Permission[]>;

export const roles: RoleConfig = {
    [Role.Admin]: [Permission.AccessAdminPanel, Permission.UserView],
    [Role.User]: [],
};
