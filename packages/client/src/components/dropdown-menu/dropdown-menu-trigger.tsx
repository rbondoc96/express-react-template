import { Trigger } from '@radix-ui/react-dropdown-menu';
import { type ComponentPropsWithoutRef, type ReactNode } from 'react';

type DropdownMenuTriggerProps = ComponentPropsWithoutRef<typeof Trigger>;

export function DropdownMenuTrigger(props: DropdownMenuTriggerProps): ReactNode {
    return <Trigger {...props} />;
}
