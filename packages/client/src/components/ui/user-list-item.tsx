import { EllipsisVertical } from 'lucide-react';
import * as React from 'react';
import { User } from '@/api/parsers/userParser';
import { Avatar } from '@/components/ui/avatar';

type UserListItemProps = {
    user: User;
};

export function UserListItem({ user }: UserListItemProps): React.ReactNode {
    return (
        <div className="flex items-center bg-gray-50 rounded px-4 py-2.5" key={user.id}>
            <div className="flex-1 grid grid-cols-5 items-center">
                <div className="flex items-center gap-3">
                    <Avatar user={user} />
                    <span>{`${user.first_name} ${user.last_name}`}</span>
                </div>
                <span>{user.role}</span>
                <span>{user.username}</span>
                <span>{user.last_signed_in_at?.toFormat('MMM dd, yyyy')}</span>
                <span>{user.created_at.toFormat('MMM dd, yyyy')}</span>
            </div>
            <EllipsisVertical className="size-4" />
        </div>
    );
}
