import { Group } from '@radix-ui/react-dropdown-menu';
import { type ComponentPropsWithoutRef, type ReactNode } from 'react';

type DropdownMenuGroupProps = ComponentPropsWithoutRef<typeof Group>;

export function DropdownMenuGroup(props: DropdownMenuGroupProps): ReactNode {
    return <Group {...props} />;
}
