import * as SeparatorPrimitive from '@radix-ui/react-separator';
import * as React from 'react';
import { cn } from '@/utilities/cn';

export type SeparatorProps = SeparatorPrimitive.SeparatorProps;

export const Separator = React.forwardRef<React.ElementRef<typeof SeparatorPrimitive.Root>, SeparatorProps>(
    ({ children, className, decorative = true, orientation = 'horizontal', ...props }, ref) => {
        return (
            <SeparatorPrimitive.Root
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
            </SeparatorPrimitive.Root>
        );
    },
);
Separator.displayName = 'Separator';
