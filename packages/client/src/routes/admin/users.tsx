import * as React from 'react';
import { ApplicationShell } from '@/components/shells/application-shell';
import { UserListItem } from '@/components/ui/user-list-item';
import { useUserListSuspenseQuery } from '@/hooks/queries/use-user-list-query';

export function AdminUsers(): React.ReactNode {
    const { data: users } = useUserListSuspenseQuery();

    return (
        <ApplicationShell>
            <h1 className="text-3xl mb-4">Users</h1>
            <div className="flex flex-col gap-4">
                {users.length > 0 && users.map((user) => <UserListItem key={user.id} user={user} />)}
            </div>
        </ApplicationShell>
    );
}
