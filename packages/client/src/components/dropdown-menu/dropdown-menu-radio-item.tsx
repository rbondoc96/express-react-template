import { ItemIndicator, RadioItem } from '@radix-ui/react-dropdown-menu';
import { DotFilledIcon } from '@radix-ui/react-icons';
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react';
import { cn } from '@/utilities/cn';

type DropdownMenuRadioItemRef = ElementRef<typeof RadioItem>;
type DropdownMenuRadioItemProps = ComponentPropsWithoutRef<typeof RadioItem>;

export const DropdownMenuRadioItem = forwardRef<DropdownMenuRadioItemRef, DropdownMenuRadioItemProps>(
    ({ className, children, ...props }, ref) => (
        <RadioItem
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
                    <DotFilledIcon className="h-4 w-4" />
                </ItemIndicator>
            </span>
            {children}
        </RadioItem>
    ),
);

DropdownMenuRadioItem.displayName = 'DropdownMenuRadioItem';
