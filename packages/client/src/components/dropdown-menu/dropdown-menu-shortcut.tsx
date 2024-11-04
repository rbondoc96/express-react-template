import { forwardRef, type PropsWithChildren } from 'react';
import { cn } from '@/utilities/cn';

type DropdownMenuShortcutProps = PropsWithChildren<{
    className?: string;
}>;

export const DropdownMenuShortcut = forwardRef<HTMLSpanElement, DropdownMenuShortcutProps>(
    ({ className, children }, ref) => (
        <span ref={ref} className={cn('ml-auto text-xs tracking-widest opacity-60', className)}>
            {children}
        </span>
    ),
);

DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';
