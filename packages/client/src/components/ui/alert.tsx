import { ExclamationTriangleIcon, InfoCircledIcon } from '@radix-ui/react-icons';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { type HtmlProps } from '@/components/types';
import { cn } from '@/utilities/cn';

const AlertDescription = React.forwardRef<HTMLParagraphElement, HtmlProps<'p'>>(
    ({ className, children, ...props }, ref) => {
        return (
            <p className={cn('text-sm leading-relaxed', className)} ref={ref} {...props}>
                {children}
            </p>
        );
    },
);
AlertDescription.displayName = 'AlertDescription';

const AlertTitle = React.forwardRef<HTMLHeadingElement, HtmlProps<'h5'>>(({ className, children, ...props }, ref) => {
    return (
        <h5 className={cn('mb-1 font-medium leading-none tracking-light', className)} ref={ref} {...props}>
            {children}
        </h5>
    );
});
AlertTitle.displayName = 'AlertTitle';

const styles = cva(
    [
        'relative',
        'w-full',
        'rounded-lg border',
        'px-4 py-3',
        'text-sm',
        '[&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7',
    ],
    {
        variants: {
            variant: {
                default: 'bg-background text-foreground',
                error: 'border-danger/50 text-danger dark:border-danger [&>svg]:text-danger',
            },
        },
        defaultVariants: {
            variant: 'error',
        },
    },
);

type AlertProps = VariantProps<typeof styles> &
    Omit<HtmlProps<'div'>, 'children' | 'title'> & {
        description: string;
        title: string;
    };

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
    ({ className, description, title, variant, ...props }, ref) => {
        const Icon = variant === 'default' ? InfoCircledIcon : ExclamationTriangleIcon;

        return (
            <div className={cn(styles({ variant }), className)} ref={ref} {...props}>
                <Icon className="h-4 w-4" />
                <AlertTitle>{title}</AlertTitle>
                <AlertDescription>{description}</AlertDescription>
            </div>
        );
    },
);
Alert.displayName = 'Alert';

type AlertFromErrorProps = {
    error: unknown;
};
export const AlertFromError = React.forwardRef<React.ElementRef<typeof Alert>, AlertFromErrorProps>(
    ({ error }, ref) => {
        const message = error instanceof Error ? error.message : 'Something went wrong.';

        return <Alert description={message} ref={ref} title="Error" variant="error" />;
    },
);
AlertFromError.displayName = 'AlertFromError';
