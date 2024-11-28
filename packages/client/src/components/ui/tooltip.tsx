import { Content, Portal, Provider, Root, Trigger } from '@radix-ui/react-tooltip';
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react';
import { cn } from '@/utilities/cn';

export const Tooltip = Root;
export const TooltipProvider = Provider;
export const TooltipTrigger = Trigger;

export const TooltipContent = forwardRef<ElementRef<typeof Content>, ComponentPropsWithoutRef<typeof Content>>(
    ({ children, className, sideOffset = 4, ...props }, ref) => {
        return (
            <Portal>
                <Content
                    className={cn(
                        'z-50',
                        'overflow-hidden',
                        'rounded-md',
                        'bg-primary',
                        'px-3 py-1.5',
                        'text-sm text-primary-foreground',
                        'animate-in fade-in-0 zoom-in-95',
                        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
                        'data-[side=bottom]:slide-in-from-top-2',
                        'data-[side=left]:slide-in-from-right-2',
                        'data-[side=right]:slide-in-from-left-2',
                        'data-[side=top]:slide-in-from-bottom-2',
                        className,
                    )}
                    ref={ref}
                    sideOffset={sideOffset}
                    {...props}
                >
                    {children}
                </Content>
            </Portal>
        );
    },
);
TooltipContent.displayName = 'TooltipContent';
