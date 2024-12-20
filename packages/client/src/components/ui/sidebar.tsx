import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { PanelLeft } from 'lucide-react';
import * as React from 'react';
import { type HtmlProps } from '@/components/types';
import { Button, type ButtonProps } from '@/components/ui/button';
import { Separator, type SeparatorProps } from '@/components/ui/separator';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/utilities/cn';

const SIDEBAR_COOKIE_NAME = 'sidebar:state';
// 7 days
const SIDEBAR_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = '16rem';
const SIDEBAR_WIDTH_MOBILE = '18rem';
const SIDEBAR_WIDTH_ICON = '4.2rem';
const SIDEBAR_KEYBOARD_SHORTCUT = 'b';

type SidebarContextState = {
    isMobile: boolean;
    open: boolean;
    openMobile: boolean;
    state: 'expanded' | 'collapsed';
    setOpen: (open: boolean) => void;
    setOpenMobile: (open: boolean) => void;
    toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContextState | null>(null);

function useSidebar() {
    const context = React.useContext(SidebarContext);

    if (!context) {
        throw new Error('useSidebar must be used within a SidebarProvider.');
    }

    return context;
}

type SidebarProviderProps = HtmlProps<'div'> & {
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
};

/**
 * Handles collapsible state.
 *
 * Provides `SidebarContextSate` to its children components
 *
 * - `defaultOpen: boolean` - Default open state of the `Sidebar`
 * - `open: boolean` - Open state of the `Sidebar` (controlled)
 * - `onOpenChange: (state: boolean) => void` - Event handler based on the `open` state of the `Sidebar`
 */
export const SidebarProvider = React.forwardRef<HTMLDivElement, SidebarProviderProps>(
    (
        {
            children,
            className,
            defaultOpen = true,
            open: openControl,
            onOpenChange: onOpenChangeControl,
            style,
            ...props
        },
        ref,
    ) => {
        const isMobile = false;
        const [openMobile, setOpenMobile] = React.useState(false);
        // Internal open controls
        const [_open, _setOpen] = React.useState(defaultOpen);

        const open = openControl || _open;
        const setOpen = React.useCallback(
            (value: boolean | ((arg: boolean) => boolean)) => {
                const openState = typeof value === 'function' ? value(open) : value;

                if (onOpenChangeControl) {
                    onOpenChangeControl(openState);
                } else {
                    _setOpen(openState);
                }

                document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE_SECONDS}`;
            },
            [onOpenChangeControl, open],
        );

        const toggleSidebar = React.useCallback(() => {
            if (isMobile) {
                setOpenMobile((prevState) => !prevState);
            } else {
                setOpen((prevState) => !prevState);
            }
        }, [isMobile, setOpen, setOpenMobile]);

        React.useEffect(() => {
            const handleKeyDown = (event: KeyboardEvent) => {
                if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
                    event.preventDefault();
                    toggleSidebar();
                }
            };

            window.addEventListener('keydown', handleKeyDown);
            return () => window.removeEventListener('keydown', handleKeyDown);
        }, [toggleSidebar]);

        const contextValue = React.useMemo<SidebarContextState>(
            () => ({
                isMobile,
                open,
                openMobile,
                state: open ? 'expanded' : 'collapsed',
                setOpen,
                setOpenMobile,
                toggleSidebar,
            }),
            [isMobile, open, openMobile, setOpen, setOpenMobile, toggleSidebar],
        );

        return (
            <SidebarContext.Provider value={contextValue}>
                <TooltipProvider delayDuration={0}>
                    <div
                        className={cn(
                            'group/sidebar-wrapper',
                            'flex',
                            'min-h-svh w-full',
                            'has-data-[variant=inset]:bg-sidebar',
                            className,
                        )}
                        ref={ref}
                        style={
                            {
                                '--sidebar-width': SIDEBAR_WIDTH,
                                '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
                                ...style,
                            } as React.CSSProperties
                        }
                        {...props}
                    >
                        {children}
                    </div>
                </TooltipProvider>
            </SidebarContext.Provider>
        );
    },
);
SidebarProvider.displayName = 'SidebarProvider';

type SidebarProps = HtmlProps<'div'> & {
    /**
     * `offcanvas` - Slide in from left or right
     *
     * `icon` - Collapses to icons
     *
     * `non` - Non-collapsible sidebar
     */
    collapsible?: 'offcanvas' | 'icon' | 'none';
    side?: 'left' | 'right';
    /**
     * `inset` - When using this, set the main content in a `SidebarInset` component
     */
    variant?: 'sidebar' | 'floating' | 'inset';
};

/**
 * The Sidebar container.
 */
export const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
    ({ children, className, collapsible = 'offcanvas', side = 'left', variant = 'sidebar', ...props }, ref) => {
        const { isMobile, openMobile, state, setOpenMobile } = useSidebar();

        if (collapsible === 'none') {
            return (
                <div
                    className={cn(
                        'flex flex-col',
                        'h-full w-(--sidebar-width)',
                        'bg-sidebar',
                        'text-sidebar-foreground',
                        className,
                    )}
                    ref={ref}
                    {...props}
                >
                    {children}
                </div>
            );
        }

        if (isMobile) {
            return (
                <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
                    <SheetContent
                        data-sidebar="sidebar"
                        data-mobile="true"
                        className="w-(--sidebar-width) bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
                        side={side}
                        style={
                            {
                                '--sidebar-width': SIDEBAR_WIDTH_MOBILE,
                            } as React.CSSProperties
                        }
                    >
                        <div className="flex flex-col h-full w-full">{children}</div>
                    </SheetContent>
                </Sheet>
            );
        }

        return (
            <div
                data-state={state}
                data-collapsible={state === 'collapsed' ? collapsible : ''}
                data-variant={variant}
                data-side={side}
                className="group peer hidden md:block text-sidebar-foreground"
                ref={ref}
            >
                {/* Sidebar gap on desktop */}
                <div
                    className={cn(
                        'relative',
                        'h-svh w-(--sidebar-width)',
                        'bg-transparent',
                        'duration-200 transition-[width] ease-linear',
                        'group-data-[collapsible=offcanvas]:w-0',
                        'group-data-[side=right]:rotate-180',
                        variant === 'floating' || variant === 'inset'
                            ? 'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+calc(var(--spacing)*4))]'
                            : 'group-data-[collapsible=icon]:w-(--sidebar-width-icon)',
                    )}
                />
                <div
                    className={cn(
                        'hidden',
                        'fixed inset-y-0 z-10',
                        'h-svh w-(--sidebar-width)',
                        'duration-200 transition-[left,right,width] ease-linear',
                        'md:flex',
                        side === 'left'
                            ? 'left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]'
                            : 'right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]',
                        // Adjust the padding for floating and inset variants.
                        variant === 'floating' || variant === 'inset'
                            ? 'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+calc(var(--spacing)*4)+2px)]'
                            : 'group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l',
                        className,
                    )}
                >
                    <div
                        data-sidebar="sidebar"
                        className={cn(
                            'flex flex-col',
                            'h-full w-full',
                            'bg-sidebar',
                            'group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow-sm',
                        )}
                    >
                        {children}
                    </div>
                </div>
            </div>
        );
    },
);
Sidebar.displayName = 'Sidebar';

/**
 * Scrollable content
 */
export const SidebarContent = React.forwardRef<HTMLDivElement, HtmlProps<'div'>>(
    ({ children, className, ...props }, ref) => {
        return (
            <div
                data-sidebar="content"
                className={cn(
                    'overflow-auto',
                    'flex-1 flex flex-col gap-2',
                    'min-h-0',
                    'group-data-[collapsible=icon]:overflow-hidden',
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
SidebarContent.displayName = 'SidebarContent';

/**
 * Section within the `SidebarContent`
 */
export const SidebarGroup = React.forwardRef<HTMLDivElement, HtmlProps<'div'>>(
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

type SidebarGroupActionProps = HtmlProps<'button'> & {
    asChild?: boolean;
};
export const SidebarGroupAction = React.forwardRef<HTMLButtonElement, SidebarGroupActionProps>(
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
                    'outline-hidden ring-sidebar-ring transition-transform',
                    'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                    'focus-visible:ring-2',
                    '[&>svg]:size-4 [&>svg]:shrink-0',
                    // Increases the hit area of the button on mobile.
                    'after:absolute after:-inset-2 md:after:hidden',
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

export const SidebarGroupContent = React.forwardRef<HTMLDivElement, HtmlProps<'div'>>(
    ({ children, className, ...props }, ref) => {
        return (
            <div data-sidebar="group-content" className={cn('w-full', 'text-sm', className)} ref={ref} {...props}>
                {children}
            </div>
        );
    },
);
SidebarGroupContent.displayName = 'SidebarGroupContent';

type SidebarGroupLabelProps = HtmlProps<'div'> & {
    asChild?: boolean;
};
export const SidebarGroupLabel = React.forwardRef<HTMLDivElement, SidebarGroupLabelProps>(
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
                    'outline-hidden ring-sidebar-ring',
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

/**
 * Trigger for the `Sidebar
 */
export const SidebarTrigger = React.forwardRef<React.ElementRef<typeof Button>, ButtonProps>(
    ({ className, onClick, ...props }, ref) => {
        const { toggleSidebar } = useSidebar();

        return (
            <Button
                data-sidebar="trigger"
                className={className}
                ref={ref}
                size="icon"
                variant="ghost"
                onClick={(event) => {
                    onClick?.(event);
                    toggleSidebar();
                }}
                {...props}
            >
                <PanelLeft />
                <span className="sr-only">Toggle Sidebar</span>
            </Button>
        );
    },
);
SidebarTrigger.displayName = 'SidebarTrigger';

export const SidebarRail = React.forwardRef<HTMLButtonElement, HtmlProps<'button'>>(
    ({ children, className, ...props }, ref) => {
        const { toggleSidebar } = useSidebar();

        return (
            <button
                aria-label="Toggle Sidebar"
                data-sidebar="rail"
                className={cn(
                    'hidden',
                    'absolute inset-y-0 z-20',
                    'w-4',
                    '-translate-x-1/2 transition-all ease-linear',
                    'after:absolute after:inset-y-0 after:left-1/2 after:w-[2px]',
                    'hover:after:bg-sidebar-border',
                    'sm:flex',
                    'group-data-[side=left]:-right-4',
                    'group-data-[side=right]:left-0',
                    'group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full hover:group-data-[collapsible=offcanvas]:bg-sidebar',
                    '[[data-side=left][data-collapsible=offcanvas]_&]:-right-2',
                    '[[data-side=left][data-state=collapsed]_&]:cursor-e-resize',
                    'in-data-[side=left]:cursor-w-resize',
                    '[[data-side=right][data-collapsible=offcanvas]_&]:-left-2',
                    '[[data-side=right][data-state=collapsed]_&]:cursor-w-resize',
                    'in-data-[side=right]:cursor-e-resize',
                    className,
                )}
                ref={ref}
                tabIndex={-1}
                title="Toggle Sidebar"
                onClick={toggleSidebar}
                {...props}
            >
                {children}
            </button>
        );
    },
);
SidebarRail.displayName = 'SidebarRail';

export const SidebarInset = React.forwardRef<HTMLDivElement, HtmlProps<'main'>>(
    ({ children, className, ...props }, ref) => {
        return (
            <main
                className={cn(
                    'relative',
                    'flex-1 flex flex-col',
                    'min-h-svh',
                    'bg-background',
                    'peer-data-[variant=inset]:min-h-[calc(100svh-calc(var(--spacing)*4))]',
                    'md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2',
                    'md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm',
                    className,
                )}
                ref={ref}
                {...props}
            >
                {children}
            </main>
        );
    },
);
SidebarInset.displayName = 'SidebarInset';

// export const SidebarInput = React.forwardRef<ElementRef<typeof FormText>, ComponentPropsWithoutRef<typeof FormText>>(
//     ({ children, className, ...props }, ref) => {
//         return (
//
//         );
//     },
// );
// SidebarInput.displayName = 'SidebarInput';

/**
 * Sticky at the top of the `Sidebar`.
 */
export const SidebarHeader = React.forwardRef<HTMLDivElement, HtmlProps<'div'>>(
    ({ children, className, ...props }, ref) => {
        return (
            <div data-sidebar="header" className={cn('flex flex-col gap-2', 'p-2', className)} ref={ref} {...props}>
                {children}
            </div>
        );
    },
);
SidebarHeader.displayName = 'SidebarHeader';

/**
 * Sticky at the bottom of the `Sidebar`.
 */
export const SidebarFooter = React.forwardRef<HTMLDivElement, HtmlProps<'div'>>(
    ({ children, className, ...props }, ref) => {
        return (
            <div data-sidebar="footer" className={cn('flex flex-col gap-2', 'p-2', className)} ref={ref} {...props}>
                {children}
            </div>
        );
    },
);
SidebarFooter.displayName = 'SidebarFooter';

export const SidebarMenu = React.forwardRef<HTMLUListElement, HtmlProps<'ul'>>(
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

export const SidebarMenuItem = React.forwardRef<HTMLLIElement, HtmlProps<'li'>>(
    ({ className, children, ...props }, ref) => {
        return (
            <li data-sidebar="menu-item" className={cn('group/menu-item relative', className)} ref={ref} {...props}>
                {children}
            </li>
        );
    },
);
SidebarMenuItem.displayName = 'SidebarMenuItem';

type SidebarMenuActionProps = HtmlProps<'button'> & {
    asChild?: boolean;
    showOnHover?: boolean;
};
export const SidebarMenuAction = React.forwardRef<HTMLButtonElement, SidebarMenuActionProps>(
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
                    'outline-hidden ring-sidebar-ring',
                    'text-sidebar-foreground',
                    'transition-transform',
                    'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                    'focus-visible:ring-2',
                    'peer-hover/menu-button:text-sidebar-accent-foreground',
                    '[&>svg]:size-4 [&>svg]:shrink-0',
                    // Increases the hit area of the button on mobile.
                    'after:absolute after:-inset-2 md:after:hidden',
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

export const SidebarMenuBadge = React.forwardRef<HTMLDivElement, HtmlProps<'div'>>(
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
        'outline-hidden ring-sidebar-ring',
        'transition-[width,height,padding]',
        'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        'focus-visible:ring-2',
        'active:bg-sidebar-accent active:text-sidebar-accent-foreground',
        'disabled:pointer-events-none disabled:opacity-50',
        'group-has-data-[sidebar=menu-action]/menu-item:pr-8',
        'aria-disabled:pointer-events-none aria-disabled:opacity-50',
        'data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground',
        'data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground',
        'group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2!',
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

type SidebarMenuButtonProps = React.ComponentProps<'button'> &
    VariantProps<typeof sidebarMenuButtonStyles> & {
        asChild?: boolean;
        isActive?: boolean;
        tooltip?: string | React.ComponentPropsWithoutRef<typeof TooltipContent>;
    };
export const SidebarMenuButton = React.forwardRef<HTMLButtonElement, SidebarMenuButtonProps>(
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
        }: React.ComponentPropsWithoutRef<typeof TooltipContent> =
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

type SidebarMenuSkeletonProps = HtmlProps<'div'> & {
    showIcon?: boolean;
};
export const SidebarMenuSkeleton = React.forwardRef<HTMLDivElement, SidebarMenuSkeletonProps>(
    ({ children, className, showIcon = false, ...props }, ref) => {
        const width = React.useMemo(
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
                    className="flex-1 h-4 max-w-(--skeleton-width)"
                    style={
                        {
                            '--skeleton-width': width,
                        } as React.CSSProperties
                    }
                />
            </div>
        );
    },
);
SidebarMenuSkeleton.displayName = 'SidebarMenuSkeleton';

export const SidebarMenuSub = React.forwardRef<HTMLUListElement, HtmlProps<'ul'>>(
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

export const SidebarMenuSubItem = React.forwardRef<HTMLLIElement, React.ComponentProps<'li'>>(
    ({ children, ...props }, ref) => {
        return (
            <li ref={ref} {...props}>
                {children}
            </li>
        );
    },
);
SidebarMenuSubItem.displayName = 'SidebarMenuSubItem';

type SidebarMenuSubButtonProps = HtmlProps<'a'> & {
    asChild?: boolean;
    isActive?: boolean;
    size?: 'sm' | 'md';
};
export const SidebarMenuSubButton = React.forwardRef<HTMLAnchorElement, SidebarMenuSubButtonProps>(
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
                    'outline-hidden ring-sidebar-ring',
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

export const SidebarSeparator = React.forwardRef<React.ElementRef<typeof Separator>, SeparatorProps>(
    ({ children, className, ...props }, ref) => {
        return (
            <Separator
                data-sidebar="separator"
                className={cn('w-auto', 'mx-2', 'bg-sidebar-border', className)}
                ref={ref}
                {...props}
            >
                {children}
            </Separator>
        );
    },
);
SidebarSeparator.displayName = 'SidebarSeparator';
