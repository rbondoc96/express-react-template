import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';
import { BaseButton, type BaseButtonProps } from '@/components/buttons/base-button';
import { cn } from '@/utilities/cn';

const styles = cva(
    [
        'relative',
        'aspect-square',
        'flex items-center justify-center',
        'outline-0 rounded-lg',
        'disabled:pointer-events-none',
    ],
    {
        variants: {
            size: {
                base: ['h-9 [&_svg]:h-6 [&_svg]:w-6'],
                sm: ['h-8 [&_svg]:h-5 [&_svg]:w-5'],
                xs: ['h-6 [&_svg]:h-4 [&_svg]:w-4'],
            },
            theme: {
                neutral: ['bg-transparent', 'text-[inherit]', 'hover:text-[inherit]'],
                primary: ['bg-primary', 'text-primary-foreground', 'hover:bg-primary/80'],
                secondary: ['bg-secondary', 'text-secondary-foreground', 'hover:bg-secondary/80'],
            },
        },
        defaultVariants: {
            size: 'base',
            theme: 'neutral',
        },
    },
);

type IconButtonProps = VariantProps<typeof styles> &
    BaseButtonProps & {
    asChild?: boolean;
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
    ({ asChild = false, className, children, size, theme, ...props }, ref) => {
        const Component = asChild ? Slot : BaseButton;

        return (
            <Component className={cn(styles({ size, theme }), className)} ref={ref} {...props}>
                {children}
            </Component>
        );
    },
);

IconButton.displayName = 'IconButton';
