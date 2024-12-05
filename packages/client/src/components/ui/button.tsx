import { Slot, Slottable } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { LoaderCircle } from 'lucide-react';
import * as React from 'react';
import { type HtmlProps } from '@/components/types';
import { cn } from '@/utilities/cn';

const styles = cva(
    [
        'relative',
        'inline-flex items-center justify-center',
        'whitespace-nowrap',
        'rounded-md',
        'text-sm font-medium',
        'transition-colors',
        'focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none',
        'disabled:opacity-50',
        '[&_svg]:pointer-events-none [&_svg]:shrink-0',
    ],
    {
        variants: {
            variant: {
                default: 'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90',
                destructive: 'bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90',
                outline: 'border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground',
                secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
                ghost: 'hover:bg-accent hover:text-accent-foreground',
                link: 'text-primary underline-offset-4 hover:underline',
            },
            size: {
                default: 'h-9 px-4 py-2',
                sm: 'h-8 rounded-md px-3 text-xs',
                lg: 'h-10 rounded-md px-8',
                icon: 'h-9 w-9 [&_svg]:size-5',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

export type ButtonProps = HtmlProps<'button'> &
    VariantProps<typeof styles> & {
        asChild?: boolean;
        loading?: boolean;
    };

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ asChild = false, children, className, loading, size, variant, ...props }, ref) => {
        const Component = asChild ? Slot : 'button';

        return (
            <Component
                className={cn(
                    styles({ variant, size }),
                    'inline-flex items-center justify-center gap-2',
                    loading && 'text-transparent',
                    className,
                )}
                ref={ref}
                {...props}
            >
                <Slottable>{children}</Slottable>
                {loading && (
                    <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <LoaderCircle className="animate-spin size-4 text-white" />
                        <span className="sr-only">Loading</span>
                    </span>
                )}
            </Component>
        );
    },
);
Button.displayName = 'Button';
