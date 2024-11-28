import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import * as React from 'react';
import { type HtmlProps } from '@/components/types';
import { cn } from '@/utilities/cn';

export const Sheet = DialogPrimitive.Root;

export const SheetClose = DialogPrimitive.Close;

const sheetContentStyles = cva(
    [
        'fixed z-50',
        'gap-4',
        'bg-background',
        'p-6',
        'shadow-lg',
        'transition ease-in-out',
        'data-[state=closed]:duration-300 data-[state=closed]:animate-out',
        'data-[state=open]:duration-500 data-[state=open]:animate-in',
    ],
    {
        variants: {
            side: {
                top: [
                    'inset-x-0 top-0',
                    'border-b',
                    'data-[state=closed]:slide-out-to-top',
                    'data-[state=open]:slide-in-from-top',
                ],
                bottom: [
                    'inset-x-0 bottom-0',
                    'border-t',
                    'data-[state=closed]:slide-out-to-bottom',
                    'data-[state=open]:slide-in-from-bottom',
                ],
                left: [
                    'inset-y-0 left-0',
                    'h-full w-3/4',
                    'sm:max-w-sm',
                    'border-r',
                    'data-[state=closed]:slide-out-to-left',
                    'data-[state=open]:slide-in-from-left',
                ],
                right: [
                    'inset-y-0 right-0',
                    'h-full w-3/4',
                    'sm:max-w-sm',
                    'border-l',
                    'data-[state=closed]:slide-out-to-right',
                    'data-[state=open]:slide-in-from-right',
                ],
            },
        },
        defaultVariants: {
            side: 'right',
        },
    },
);

type SheetContentProps = DialogPrimitive.DialogContentProps & VariantProps<typeof sheetContentStyles>;
export const SheetContent = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Content>, SheetContentProps>(
    ({ children, className, side = 'right', ...props }, ref) => {
        return (
            <DialogPrimitive.Portal>
                <SheetOverlay />
                <DialogPrimitive.Content className={cn(sheetContentStyles({ side }), className)} ref={ref} {...props}>
                    <DialogPrimitive.Close
                        className={cn(
                            'absolute right-4 top-4',
                            'rounded-sm',
                            'ring-offset-background',
                            'opacity-70',
                            'transition-opacity',
                            'hover:opacity-100',
                            'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                            'disabled:pointer-events-none',
                            'data-[state=open]:bg-secondary',
                        )}
                    >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </DialogPrimitive.Close>
                    {children}
                </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
        );
    },
);
SheetContent.displayName = 'SheetContent';

export const SheetDescription = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Description>,
    DialogPrimitive.DialogDescriptionProps
>(({ children, className, ...props }, ref) => {
    return (
        <DialogPrimitive.Description className={cn('text-sm text-muted-foreground', className)} ref={ref} {...props}>
            {children}
        </DialogPrimitive.Description>
    );
});
SheetDescription.displayName = 'SheetDescription';

export const SheetHeader = React.forwardRef<HTMLDivElement, HtmlProps<'div'>>(
    ({ children, className, ...props }, ref) => {
        return (
            <div className={cn('flex flex-col gap-2', 'text-center', 'sm:text-left', className)} ref={ref} {...props}>
                {children}
            </div>
        );
    },
);
SheetHeader.displayName = 'SheetHeader';

export const SheetFooter = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Title>,
    DialogPrimitive.DialogTitleProps
>(({ children, className, ...props }, ref) => {
    return (
        <DialogPrimitive.Title className={cn('text-lg font-semibold text-foreground', className)} ref={ref} {...props}>
            {children}
        </DialogPrimitive.Title>
    );
});
SheetFooter.displayName = 'SheetFooter';

export const SheetOverlay = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Overlay>,
    DialogPrimitive.DialogOverlayProps
>(({ children, className, ...props }, ref) => {
    return (
        <DialogPrimitive.Overlay
            className={cn(
                'fixed inset-0 z-50',
                'bg-black/80',
                'data-[state=open]:animate-in data-[state=open]:fade-in-0',
                'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
                className,
            )}
            ref={ref}
            {...props}
        >
            {children}
        </DialogPrimitive.Overlay>
    );
});
SheetOverlay.displayName = 'SheetOverlay';

export const SheetPortal = DialogPrimitive.Portal;

export const SheetTrigger = DialogPrimitive.Trigger;
