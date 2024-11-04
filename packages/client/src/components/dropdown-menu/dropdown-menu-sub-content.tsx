import { SubContent } from '@radix-ui/react-dropdown-menu';
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react';
import { cn } from '@/utilities/cn';

type DropdownMenuSubContentRef = ElementRef<typeof SubContent>;
type DropdownMenuSubContentProps = ComponentPropsWithoutRef<typeof SubContent>;

export const DropdownMenuSubContent = forwardRef<DropdownMenuSubContentRef, DropdownMenuSubContentProps>(
    ({ className, children, ...props }, ref) => (
        <SubContent
            ref={ref}
            className={cn(
                'z-50 min-w-[8rem]',
                'overflow-hidden',
                'rounded-md border shadow-lg',
                'bg-popover',
                'p-1',
                'text-popover-foreground',
                'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
                'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
                'data-[side=bottom]:slide-in-from-top-2',
                'data-[side=left]:slide-in-from-right-2',
                'data-[side=right]:slide-in-from-left-2',
                'data-[side=top]:slide-in-from-bottom-2',
                className,
            )}
            {...props}
        >
            {children}
        </SubContent>
    ),
);

DropdownMenuSubContent.displayName = 'DropdownMenuSubContent';
