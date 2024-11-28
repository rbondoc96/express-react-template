import { Slot } from '@radix-ui/react-slot';
import { type ComponentProps, forwardRef } from 'react';
import { cn } from '@/utilities/cn';

/**
 * Section within the `SidebarContent`
 */
export const SidebarGroup = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
    ({ children, className, ...props }, ref) => {
        return (
            <div
                data-sidebar="group"
                className={cn('relative', 'flex flex-col', 'w-full min-w-0', 'p-2', className)}
                ref={ref}
                {...props}
            >
                {children}
            </div>
        );
    },
);
SidebarGroup.displayName = 'SidebarGroup';

type SidebarGroupActionProps = ComponentProps<'button'> & {
    asChild?: boolean;
};
export const SidebarGroupAction = forwardRef<HTMLButtonElement, SidebarGroupActionProps>(
    ({ asChild = false, children, className, ...props }, ref) => {
        const Component = asChild ? Slot : 'button';

        return (
            <Component
                data-sidebar="group-action"
                className={cn(
                    'absolute right-3 top-3.5',
                    'flex items-center justify-center',
                    'aspect-square w-5',
                    'p-0',
                    'rounded-md',
                    'text-sidebar-foreground',
                    'outline-none ring-sidebar-ring transition-transform',
                    'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                    'focus-visible:ring-2',
                    '[&>svg]:size-4 [&>svg]:shrink-0',
                    // Increases the hit area of the button on mobile.
                    'after:absolute after:-inset-2 after:md:hidden',
                    'group-data-[collapsible=icon]:hidden',
                    className,
                )}
                ref={ref}
                {...props}
            >
                {children}
            </Component>
        );
    },
);
SidebarGroupAction.displayName = 'SidebarGroupAction';

export const SidebarGroupContent = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
    ({ children, className, ...props }, ref) => {
        return (
            <div data-sidebar="group-content" className={cn('w-full', 'text-sm', className)} ref={ref} {...props}>
                {children}
            </div>
        );
    },
);
SidebarGroupContent.displayName = 'SidebarGroupContent';

type SidebarGroupLabelProps = ComponentProps<'div'> & {
    asChild?: boolean;
};
export const SidebarGroupLabel = forwardRef<HTMLDivElement, SidebarGroupLabelProps>(
    ({ asChild = false, children, className, ...props }, ref) => {
        const Component = asChild ? Slot : 'div';

        return (
            <Component
                data-sidebar="group-label"
                className={cn(
                    'flex shrink-0 items-center',
                    'h-8',
                    'rounded-md',
                    'px-2',
                    'text-xs font-medium text-sidebar-foreground/70',
                    'outline-none ring-sidebar-ring',
                    'focus-visible:ring-2',
                    '[&>svg]:size-4 [&>svg]:shrink-0',
                    'duration-200 transition-[margin,opa] ease-linear',
                    'group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0',
                    className,
                )}
                ref={ref}
                {...props}
            >
                {children}
            </Component>
        );
    },
);
SidebarGroupLabel.displayName = 'SidebarGroupLabel';
