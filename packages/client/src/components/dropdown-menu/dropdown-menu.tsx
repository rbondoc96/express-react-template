import { Root } from '@radix-ui/react-dropdown-menu';
import { type ComponentPropsWithoutRef, type ReactNode } from 'react';

type DropdownMenuProps = ComponentPropsWithoutRef<typeof Root>;

export function DropdownMenu(props: DropdownMenuProps): ReactNode {
    return <Root {...props} />;
}
