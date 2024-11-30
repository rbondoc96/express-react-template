export const Permission = {
    AccessAdminPanel: 'access_admin_panel',
    UserView: 'user_view',
} as const;

export type Permission = (typeof Permission)[keyof typeof Permission];
