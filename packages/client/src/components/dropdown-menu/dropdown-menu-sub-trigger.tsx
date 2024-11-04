import { SubTrigger } from '@radix-ui/react-dropdown-menu';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react';
import { cn } from '@/utilities/cn';

type DropdownMenuSubTriggerRef = ElementRef<typeof SubTrigger>;
type DropdownMenuSubTriggerProps = ComponentPropsWithoutRef<typeof SubTrigger> & {
    inset?: boolean;
};

export const DropdownMenuSubTrigger = forwardRef<DropdownMenuSubTriggerRef, DropdownMenuSubTriggerProps>(
    ({ className, inset, children, ...props }, ref) => (
        <SubTrigger
            ref={ref}
            className={cn(
                'flex gap-2 items-center',
                'px-2 py-1.5',
                inset && 'pl-8',
                'cursor-default select-none rounded-sm outline-none',
                'text-sm',
                'outline-none',
                'focus:bg-accent',
                'data-[state=open]:bg-accent',
                '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
                className,
            )}
            {...props}
        >
            {children}
            <ChevronRightIcon className="ml-auto" />
        </SubTrigger>
    ),
);

DropdownMenuSubTrigger.displayName = 'DropdownMenuSubTrigger';
