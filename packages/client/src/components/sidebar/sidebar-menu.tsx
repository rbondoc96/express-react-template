import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { type ComponentProps, type ComponentPropsWithoutRef, type CSSProperties, forwardRef, useMemo } from 'react';
import { useSidebar } from '@/components/sidebar/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/utilities/cn';

export const SidebarMenu = forwardRef<HTMLUListElement, ComponentProps<'ul'>>(
    ({ children, className, ...props }, ref) => {
        return (
            <ul
                data-sidebar="menu"
                className={cn('flex flex-col gap-1', 'w-full min-w-0', className)}
                ref={ref}
                {...props}
            >
                {children}
            </ul>
        );
    },
);
SidebarMenu.displayName = 'SidebarMenu';

export const SidebarMenuItem = forwardRef<HTMLLIElement, ComponentProps<'li'>>(
    ({ className, children, ...props }, ref) => {
        return (
            <li data-sidebar="menu-item" className={cn('group/menu-item relative', className)} ref={ref} {...props}>
                {children}
            </li>
        );
    },
);
SidebarMenuItem.displayName = 'SidebarMenuItem';

type SidebarMenuActionProps = ComponentProps<'button'> & {
    asChild?: boolean;
    showOnHover?: boolean;
};
export const SidebarMenuAction = forwardRef<HTMLButtonElement, SidebarMenuActionProps>(
    ({ asChild = false, children, className, showOnHover = false, ...props }, ref) => {
        const Component = asChild ? Slot : 'button';

        return (
            <Component
                data-sidebar="menu-action"
                className={cn(
                    'absolute right-1 top-1.5',
                    'flex items-center justify-center',
                    'aspect-square w-5',
                    'rounded-md',
                    'p-0',
                    'outline-none ring-sidebar-ring',
                    'text-sidebar-foreground',
                    'transition-transform',
                    'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                    'focus-visible:ring-2',
                    'peer-hover/menu-button:text-sidebar-accent-foreground',
                    '[&>svg]:size-4 [&>svg]:shrink-0',
                    // Increases the hit area of the button on mobile.
                    'after:absolute after:-inset-2 after:md:hidden',
                    'peer-data-[size=sm]/menu-button:top-1',
                    'peer-data-[size=default]/menu-button:top-1.5',
                    'peer-data-[size=lg]/menu-button:top-2.5',
                    'group-data-[collapsible=icon]:hidden',
                    showOnHover &&
                        'group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0',
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
SidebarMenuAction.displayName = 'SidebarMenuAction';

export const SidebarMenuBadge = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
    ({ children, className, ...props }, ref) => {
        return (
            <div
                data-sidebar="menu-badget"
                className={cn(
                    'absolute right-1',
                    'flex items-center justify-center',
                    'h-5 min-w-5',
                    'px-1',
                    'rounded-md',
                    'text-xs font-medium text-sidebar-foreground',
                    'tabular-nums',
                    'select-none pointer-events-none',
                    'peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground',
                    'peer-data-[size=sm]/menu-button:top-1',
                    'peer-data-[size=default]/menu-button:top-1.5',
                    'peer-data-[size=lg]/menu-button:top-2.5',
                    'group-data-[collapsible=icon]:hidden',
                    className,
                )}
                ref={ref}
                {...props}
            >
                {children}
            </div>
        );
    },
);
SidebarMenuBadge.displayName = 'SidebarMenuBadge';

const sidebarMenuButtonStyles = cva(
    [
        'overflow-hidden',
        'flex items-center gap-2',
        'w-full',
        'p-2',
        'rounded-md',
        'text-left text-sm',
        'outline-none ring-sidebar-ring',
        'transition-[width,height,padding]',
        'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        'focus-visible:ring-2',
        'active:bg-sidebar-accent active:text-sidebar-accent-foreground',
        'disabled:pointer-events-none disabled:opacity-50',
        'group-has-[[data-sidebar=menu-action]]/menu-item:pr-8',
        'aria-disabled:pointer-events-none aria-disabled:opacity-50',
        'data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground',
        'data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground',
        'group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2',
        '[&>span:last-child]:truncate',
        '[&>svg]:size-5 [&>svg]:shrink-0',
        'peer/menu-button',
    ],
    {
        variants: {
            size: {
                default: ['hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'],
                outline: [
                    'bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))]',
                    'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]',
                ],
            },
            variant: {
                default: ['h-8', 'text-sm'],
                lg: ['h-12', 'text-sm', 'group-data[collapsible=icon]:!p-0'],
                sm: ['h-7', 'text-xs'],
            },
        },
        defaultVariants: {
            size: 'default',
            variant: 'default',
        },
    },
);

type SidebarMenuButtonProps = ComponentProps<'button'> &
    VariantProps<typeof sidebarMenuButtonStyles> & {
        asChild?: boolean;
        isActive?: boolean;
        tooltip?: string | ComponentPropsWithoutRef<typeof TooltipContent>;
    };
export const SidebarMenuButton = forwardRef<HTMLButtonElement, SidebarMenuButtonProps>(
    (
        {
            asChild = false,
            isActive = false,
            children,
            className,
            size = 'default',
            variant = 'default',
            tooltip,
            ...props
        },
        ref,
    ) => {
        const Component = asChild ? Slot : 'button';
        const { isMobile, state } = useSidebar();

        const button = (
            <Component
                data-active={isActive}
                data-sidebar="menu-button"
                data-size={size}
                className={cn(sidebarMenuButtonStyles({ size, variant }), className)}
                ref={ref}
                {...props}
            >
                {children}
            </Component>
        );

        if (!tooltip) {
            return button;
        }

        const {
            children: computedTooltipChildren,
            ...computedTooltipProps
        }: ComponentPropsWithoutRef<typeof TooltipContent> =
            typeof tooltip !== 'string'
                ? tooltip
                : {
                      children: tooltip,
                  };

        return (
            <Tooltip>
                <TooltipTrigger asChild>{button}</TooltipTrigger>
                <TooltipContent
                    align="center"
                    side="right"
                    hidden={state === 'collapsed' || isMobile}
                    {...computedTooltipProps}
                >
                    {computedTooltipChildren}
                </TooltipContent>
            </Tooltip>
        );
    },
);
SidebarMenuButton.displayName = 'SidebarMenuButton';

type SidebarMenuSkeletonProps = ComponentProps<'div'> & {
    showIcon?: boolean;
};
export const SidebarMenuSkeleton = forwardRef<HTMLDivElement, SidebarMenuSkeletonProps>(
    ({ children, className, showIcon = false, ...props }, ref) => {
        const width = useMemo(
            // Random width between 50 to 90%
            () => `${Math.floor(Math.random() * 40) + 50}%`,
            [],
        );

        return (
            <div
                data-sidebar="menu-skeleton"
                className={cn('flex items-center gap-2', 'h-8', 'px-2', 'rounded-md', className)}
                ref={ref}
                {...props}
            >
                {children}
                {showIcon && <Skeleton data-sidebar="menu-skeleton-icon" className="size-4 rounded-md" />}
                <Skeleton
                    data-sidebar="menu-skeletn-text"
                    className="flex-1 h-4 max-w-[--skeleton-width]"
                    style={
                        {
                            '--skeleton-width': width,
                        } as CSSProperties
                    }
                />
            </div>
        );
    },
);
SidebarMenuSkeleton.displayName = 'SidebarMenuSkeleton';

export const SidebarMenuSub = forwardRef<HTMLUListElement, ComponentProps<'ul'>>(
    ({ children, className, ...props }, ref) => {
        return (
            <ul
                data-sidebar="menu-sub"
                className={cn(
                    'flex flex-col gap-1',
                    'min-w-0',
                    'mx-3.5',
                    'px-2.5 py-0.5',
                    'border-l border-sidebar-border',
                    'translate-x-px',
                    'group-data-[collapsible=icon]:hidden',
                    className,
                )}
                ref={ref}
                {...props}
            >
                {children}
            </ul>
        );
    },
);
SidebarMenuSub.displayName = 'SidebarMenuSub';

export const SidebarMenuSubItem = forwardRef<HTMLLIElement, ComponentProps<'li'>>(({ children, ...props }, ref) => {
    return (
        <li ref={ref} {...props}>
            {children}
        </li>
    );
});
SidebarMenuSubItem.displayName = 'SidebarMenuSubItem';

type SidebarMenuSubButtonProps = ComponentProps<'a'> & {
    asChild?: boolean;
    isActive?: boolean;
    size?: 'sm' | 'md';
};
export const SidebarMenuSubButton = forwardRef<HTMLAnchorElement, SidebarMenuSubButtonProps>(
    ({ asChild = false, children, className, isActive, size = 'md', ...props }, ref) => {
        const Component = asChild ? Slot : 'a';

        return (
            <Component
                data-active={isActive}
                data-sidebar="menu-sub-button"
                data-size={size}
                className={cn(
                    'overflow-hidden',
                    'flex items-center gap-2',
                    'h-7 min-w-0',
                    'rounded-md px-2',
                    'text-sidebar-foreground',
                    'outline-none ring-sidebar-ring',
                    '-translate-x-px',
                    size === 'sm' && 'text-xs',
                    size === 'md' && 'text-sm',
                    'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                    'focus-visible:ring-2',
                    'active:bg-sidebar-accent active:text-sidebar-accent-foreground',
                    'disabled:pointer-events-none disabled:opacity-50',
                    'aria-disabled:pointer-events-none aria-disabled:opacity-50',
                    '[&>span:last-child]:truncate',
                    '[&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground',
                    'data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground',
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
SidebarMenuSubButton.displayName = 'SidebarMenuSubButton';
