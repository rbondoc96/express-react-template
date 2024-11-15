import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';
import { BaseButton, type BaseButtonProps } from '@/components/buttons/base-button';
import { cn } from '@/utilities/cn';

const styles = cva(['rounded-md', 'outline-0', 'text-center'], {
    variants: {
        size: {
            base: ['text-base', 'px-5 py-2'],
            lg: ['text-lg'],
            sm: ['font-medium text-sm'],
            xs: ['font-medium text-xs'],
        },
        theme: {
            primary: ['bg-primary', 'text-primary-foreground', 'hover:bg-primary/90'],
        },
    },
    defaultVariants: {
        size: 'base',
        theme: 'primary',
    },
});

type SolidButtonProps = VariantProps<typeof styles> &
    BaseButtonProps & {
        asChild?: boolean;
    };

export const SolidButton = forwardRef<HTMLButtonElement, SolidButtonProps>(
    ({ asChild = false, children, className, size, theme, ...props }, ref) => {
        const Component = asChild ? Slot : BaseButton;

        return (
            <Component className={cn(styles({ size, theme }), className)} ref={ref} {...props}>
                {children}
            </Component>
        );
    },
);

SolidButton.displayName = 'SolidButton';
