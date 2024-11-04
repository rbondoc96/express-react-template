import { Separator } from '@radix-ui/react-dropdown-menu';
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react';
import { cn } from '@/utilities/cn';

type DropdownMenuSeparatorRef = ElementRef<typeof Separator>;
type DropdownMenuSeparatorProps = ComponentPropsWithoutRef<typeof Separator>;

export const DropdownMenuSeparator = forwardRef<DropdownMenuSeparatorRef, DropdownMenuSeparatorProps>(
    ({ className, children, ...props }, ref) => (
        <Separator ref={ref} className={cn('-mx-1 my-1 h-px bg-muted', className)} {...props}>
            {children}
        </Separator>
    ),
);

DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';
