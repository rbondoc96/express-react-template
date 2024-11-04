import { Sub } from '@radix-ui/react-dropdown-menu';
import { type ComponentPropsWithoutRef, type ReactNode } from 'react';

type DropdownMenuSubProps = ComponentPropsWithoutRef<typeof Sub>;

export function DropdownMenuSub(props: DropdownMenuSubProps): ReactNode {
    return <Sub {...props} />;
}
