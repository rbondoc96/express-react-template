import { Content } from '@radix-ui/react-dropdown-menu';
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react';
import { DropdownMenuPortal } from '@/components/dropdown-menu/dropdown-menu-portal';
import { cn } from '@/utilities/cn';

type DropdownMenuContentRef = ElementRef<typeof Content>;
type DropdownMenuContentProps = ComponentPropsWithoutRef<typeof Content>;

export const DropdownMenuContent = forwardRef<DropdownMenuContentRef, DropdownMenuContentProps>(
    ({ className, children, sideOffset = 4, ...props }, ref) => (
        <DropdownMenuPortal>
            <Content
                ref={ref}
                sideOffset={sideOffset}
                className={cn(
                    'z-50 min-w-[8rem]',
                    'overflow-hidden',
                    'rounded-md border',
                    'bg-popover shadow-md',
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
            </Content>
        </DropdownMenuPortal>
    ),
);

DropdownMenuContent.displayName = 'DropdownMenuContent';
