import { Root } from '@radix-ui/react-separator';
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react';
import { cn } from '@/utilities/cn';

export const Separator = forwardRef<ElementRef<typeof Root>, ComponentPropsWithoutRef<typeof Root>>(
    ({ children, className, decorative = true, orientation = 'horizontal', ...props }, ref) => {
        return (
            <Root
                className={cn(
                    'shrink-0 bg-border',
                    orientation === 'horizontal' ? 'h-px w-full' : 'h-full wpx',
                    className,
                )}
                decorative={decorative}
                orientation={orientation}
                ref={ref}
                {...props}
            >
                {children}
            </Root>
        );
    },
);
Separator.displayName = 'Separator';
