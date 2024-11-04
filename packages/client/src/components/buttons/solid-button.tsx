import { Slot } from '@radix-ui/react-slot';
import { forwardRef } from 'react';
import { BaseButton, type BaseButtonProps } from '@/components/buttons/base-button';

type SolidButtonProps = BaseButtonProps & {
    asChild?: boolean;
};

export const SolidButton = forwardRef<HTMLButtonElement, SolidButtonProps>(({ asChild = false, children }, ref) => {
    const Component = asChild ? Slot : BaseButton;

    return <Component ref={ref}>{children}</Component>;
});

SolidButton.displayName = 'SolidButton';
