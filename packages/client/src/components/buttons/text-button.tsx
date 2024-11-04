import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';
import { BaseButton, type BaseButtonProps } from '@/components/buttons/base-button';
import { cn } from '@/utilities/cn';

const styles = cva(['rounded-md', 'outline-0', 'hover:decoration-1 hover:underline'], {
    variants: {
        size: {
            base: ['text-base'],
            lg: ['text-lg'],
            sm: ['font-medium text-sm'],
            xs: ['font-medium text-xs'],
        },
        theme: {
            primary: ['decoration-foreground', 'text-foreground'],
            secondary: ['decoration-foreground', 'text-foreground'],
        },
    },
    defaultVariants: {
        size: 'base',
        theme: 'primary',
    },
});

type TextButtonProps = VariantProps<typeof styles> &
    BaseButtonProps & {
    asChild?: boolean;
};

export const TextButton = forwardRef<HTMLButtonElement, TextButtonProps>(
    ({ asChild = false, children, className, size, theme, ...props }, ref) => {
        const Component = asChild ? Slot : BaseButton;

        return (
            <Component className={cn(styles({ size, theme }), className)} ref={ref} {...props}>
                {children}
            </Component>
        );
    },
);

TextButton.displayName = 'TextButton';
