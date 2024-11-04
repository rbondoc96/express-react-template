import { UpdateIcon } from '@radix-ui/react-icons';
import { forwardRef, type JSX } from 'react';
import { cn } from '@/utilities/cn';

type HtmlButtonProps = JSX.IntrinsicElements['button'];
type PickedProps = Omit<HtmlButtonProps, 'type'>;

export type BaseButtonProps = PickedProps & {
    loading?: boolean;
    type?: 'button' | 'reset' | 'submit';
};

export const BaseButton = forwardRef<HTMLButtonElement, BaseButtonProps>(
    ({ children, className, disabled, loading, type, ...props }, ref) => {
        return (
            <button
                aria-disabled={disabled || loading}
                className={className}
                type={type}
                disabled={disabled || loading}
                ref={ref}
                {...props}
            >
                {loading && (
                    <span
                        className={cn(
                            'absolute top-1/2 left-1/2',
                            'transform -translate-x-1/2 -translate-y-1/2',
                        )}
                    >
                        <UpdateIcon className="animate-spin" />
                        <span className="sr-only">Loading</span>
                    </span>
                )}
                <span className={cn(loading && 'text-transparent')}>{children}</span>
            </button>
        );
    },
);

BaseButton.displayName = 'BaseButton';
