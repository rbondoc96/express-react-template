export const Permission = {
    AccessAdminPanel: 'access_admin_panel',
} as const;

export type Permission = (typeof Permission)[keyof typeof Permission];
