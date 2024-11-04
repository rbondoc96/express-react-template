import { CheckboxItem, ItemIndicator } from '@radix-ui/react-dropdown-menu';
import { CheckIcon } from '@radix-ui/react-icons';
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react';
import { cn } from '@/utilities/cn';

type DropdownMenuCheckboxItemRef = ElementRef<typeof CheckboxItem>;
type DropdownMenuCheckboxItemProps = ComponentPropsWithoutRef<typeof CheckboxItem>;

export const DropdownMenuCheckboxItem = forwardRef<DropdownMenuCheckboxItemRef, DropdownMenuCheckboxItemProps>(
    ({ className, checked, children, ...props }, ref) => (
        <CheckboxItem
            checked={checked}
            ref={ref}
            className={cn(
                'relative',
                'flex items-center',
                'rounded-sm outline-none',
                'py-1.5 pl-8 pr-2',
                'text-sm',
                'cursor-default select-none',
                'transition-colors',
                'focus:bg-accent focus:text-accent-foreground',
                'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
                className,
            )}
            {...props}
        >
            <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                <ItemIndicator>
                    <CheckIcon className="h-4 w-4" />
                </ItemIndicator>
            </span>
            {children}
        </CheckboxItem>
    ),
);

DropdownMenuCheckboxItem.displayName = 'DropdownMenuCheckboxItem';
