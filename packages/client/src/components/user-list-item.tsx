import { EllipsisVertical, UserRoundPen } from 'lucide-react';
import * as React from 'react';
import { User } from '@/api/parsers/userParser';
import { EditUserModal } from '@/components/edit-user-modal';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

type UserListItemProps = {
    user: User;
};

export function UserListItem({ user }: UserListItemProps): React.ReactNode {
    const [openEditUser, setOpenEditUser] = React.useState(false);

    return (
        <div className="relative flex items-center bg-gray-50 rounded px-4 py-2.5" key={user.id}>
            <div className="flex-1 grid grid-cols-5 items-center text-sm">
                <div className="flex items-center gap-3">
                    <Avatar user={user} />
                    <span>{`${user.first_name} ${user.last_name}`}</span>
                </div>
                <span>{user.role}</span>
                <span>{user.username}</span>
                <span>{user.last_signed_in_at?.toFormat('MMM dd, yyyy')}</span>
                <span>{user.created_at.toFormat('MMM dd, yyyy')}</span>
            </div>
            <Popover>
                <PopoverTrigger asChild>
                    <Button className="absolute right-0 h-8 w-8 [&_svg]:size-4" size="icon" variant="ghost">
                        <EllipsisVertical />
                        <span className="sr-only">Manage User</span>
                    </Button>
                </PopoverTrigger>
                <PopoverContent align="end">
                    <div>
                        <Button variant="ghost" onClick={() => setOpenEditUser(true)}>
                            <UserRoundPen className="size-3" />
                            <span>Edit User</span>
                        </Button>
                        <EditUserModal open={openEditUser} user={user} onOpenChange={setOpenEditUser} />
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}
