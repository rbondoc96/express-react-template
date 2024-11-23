import { Close, Content, Description, Overlay, Portal, Root, Title, Trigger } from '@radix-ui/react-dialog';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef, type JSX } from 'react';
import { cn } from '@/utilities/cn';

export const Sheet = Root;
export const SheetClose = Close;
export const SheetPortal = Portal;
export const SheetTrigger = Trigger;

export const SheetOverlay = forwardRef<ElementRef<typeof Overlay>, ComponentPropsWithoutRef<typeof Overlay>>(
    ({ children, className, ...props }, ref) => {
        return (
            <Overlay
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
            </Overlay>
        );
    },
);
SheetOverlay.displayName = 'SheetOverlay';

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

type SheetContentProps = ComponentPropsWithoutRef<typeof Content> & VariantProps<typeof sheetContentStyles>;

export const SheetContent = forwardRef<ElementRef<typeof Content>, SheetContentProps>(
    ({ children, className, side = 'right', ...props }, ref) => {
        return (
            <Portal>
                <SheetOverlay />
                <Content className={cn(sheetContentStyles({ side }), className)} ref={ref} {...props}>
                    <Close
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
                    </Close>
                    {children}
                </Content>
            </Portal>
        );
    },
);
SheetContent.displayName = 'SheetContent';

export const SheetHeader = forwardRef<HTMLDivElement, JSX.IntrinsicElements['div']>(
    ({ children, className, ...props }, ref) => {
        return (
            <div className={cn('flex flex-col gap-2', 'text-center', 'sm:text-left', className)} ref={ref} {...props}>
                {children}
            </div>
        );
    },
);
SheetHeader.displayName = 'SheetHeader';

export const SheetFooter = forwardRef<ElementRef<typeof Title>, ComponentPropsWithoutRef<typeof Title>>(
    ({ children, className, ...props }, ref) => {
        return (
            <Title className={cn('text-lg font-semibold text-foreground', className)} ref={ref} {...props}>
                {children}
            </Title>
        );
    },
);
SheetFooter.displayName = 'SheetFooter';

export const SheetDescription = forwardRef<
    ElementRef<typeof Description>,
    ComponentPropsWithoutRef<typeof Description>
>(({ children, className, ...props }, ref) => {
    return (
        <Description className={cn('text-sm text-muted-foreground', className)} ref={ref} {...props}>
            {children}
        </Description>
    );
});
SheetDescription.displayName = 'SheetDescription';
