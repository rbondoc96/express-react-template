import { Portal } from '@radix-ui/react-dropdown-menu';
import { type ComponentPropsWithoutRef, type ReactNode } from 'react';

type DropdownMenuPortalProps = ComponentPropsWithoutRef<typeof Portal>;

export function DropdownMenuPortal(props: DropdownMenuPortalProps): ReactNode {
    return <Portal {...props} />;
}
