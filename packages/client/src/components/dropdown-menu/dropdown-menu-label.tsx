import { Label } from '@radix-ui/react-dropdown-menu';
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react';
import { cn } from '@/utilities/cn';

type DropdownMenuLabelRef = ElementRef<typeof Label>;
type DropdownMenuLabelProps = ComponentPropsWithoutRef<typeof Label> & {
    inset?: boolean;
};

export const DropdownMenuLabel = forwardRef<DropdownMenuLabelRef, DropdownMenuLabelProps>(
    ({ className, children, inset, ...props }, ref) => (
        <Label ref={ref} className={cn('px-2 py-1.5 text-sm font-semibold', inset && 'pl-8', className)} {...props}>
            {children}
        </Label>
    ),
);

DropdownMenuLabel.displayName = 'DropdownMenuLabel';
