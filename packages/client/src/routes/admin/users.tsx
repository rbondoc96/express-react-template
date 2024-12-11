import * as React from 'react';
import { ApplicationShell, type HeaderConfig } from '@/components/shells/application-shell';
import { ListShell } from '@/components/shells/list-shell';
import { UserListItem } from '@/components/user-list-item';
import { useUserListSuspenseQuery } from '@/hooks/queries/use-user-list-query';

const headerConfig: HeaderConfig = {
    breadcrumbs: [{ label: 'Users', to: '/users' }],
};

export function AdminUsers(): React.ReactNode {
    const { data: users, error } = useUserListSuspenseQuery();

    return (
        <ApplicationShell headerConfig={headerConfig}>
            <div className="px-4 py-4">
                <div className="mb-4">
                    <h1 className="text-2xl font-medium mb-0.5">Users</h1>
                    <p className="text-sm">View and manage user accounts.</p>
                </div>
                <div className="grid grid-cols-5 px-4 py-2 text-sm bg-gray-100 rounded mb-2">
                    <span>Name</span>
                    <span>Role</span>
                    <span>Email</span>
                    <span>Last Logged In</span>
                    <span>Account Created</span>
                </div>
                <ListShell error={error} items={users}>
                    <div className="flex flex-col gap-4">
                        {users.length > 0 && users.map((user) => <UserListItem key={user.id} user={user} />)}
                    </div>
                </ListShell>
            </div>
        </ApplicationShell>
    );
}
