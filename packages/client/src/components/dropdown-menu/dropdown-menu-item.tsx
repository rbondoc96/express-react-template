import { Item } from '@radix-ui/react-dropdown-menu';
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react';
import { cn } from '@/utilities/cn';

type DropdownMenuItemRef = ElementRef<typeof Item>;
type DropdownMenuItemProps = ComponentPropsWithoutRef<typeof Item> & {
    inset?: boolean;
};

export const DropdownMenuItem = forwardRef<DropdownMenuItemRef, DropdownMenuItemProps>(
    ({ className, children, inset, ...props }, ref) => (
        <Item
            ref={ref}
            className={cn(
                'relative',
                'flex items-center gap-2',
                'cursor-default select-none',
                'rounded-sm outline-none',
                'px-2 py-1.5',
                inset && 'pl-8',
                'text-sm',
                'transition-colors',
                'focus:bg-accent focus:text-accent-foreground',
                'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
                '[&>svg]:size-4 [&>svg]:shrink-0',
                className,
            )}
            {...props}
        >
            {children}
        </Item>
    ),
);

DropdownMenuItem.displayName = 'DropdownMenuItem';
