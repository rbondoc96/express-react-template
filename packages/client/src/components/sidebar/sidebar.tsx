import { PanelLeft } from 'lucide-react';
import {
    type ComponentPropsWithoutRef,
    createContext,
    type CSSProperties,
    type ElementRef,
    forwardRef,
    type JSX,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { Button } from '@/components/button';
import { Separator } from '@/components/separator';
import { Sheet, SheetContent } from '@/components/sheet';
import { TooltipProvider } from '@/components/tooltip';
import { cn } from '@/utilities/cn';

const SIDEBAR_COOKIE_NAME = 'sidebar:state';
// 7 days
const SIDEBAR_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = '16rem';
const SIDEBAR_WIDTH_MOBILE = '18rem';
const SIDEBAR_WIDTH_ICON = '3.2rem';
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

const SidebarContext = createContext<SidebarContextState | null>(null);

export function useSidebar() {
    const context = useContext(SidebarContext);

    if (!context) {
        throw new Error('useSidebar mus be used within a SidebarProvider.');
    }

    return context;
}

type SidebarProviderProps = JSX.IntrinsicElements['div'] & {
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
export const SidebarProvider = forwardRef<HTMLDivElement, SidebarProviderProps>(
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
        const [openMobile, setOpenMobile] = useState(false);
        // Internal open controls
        const [_open, _setOpen] = useState(defaultOpen);

        const open = openControl || _open;
        const setOpen = useCallback(
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

        const toggleSidebar = useCallback(() => {
            if (isMobile) {
                setOpenMobile((prevState) => !prevState);
            } else {
                setOpen((prevState) => !prevState);
            }
        }, [isMobile, setOpen, setOpenMobile]);

        useEffect(() => {
            const handleKeyDown = (event: KeyboardEvent) => {
                if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
                    event.preventDefault();
                    toggleSidebar();
                }
            };

            window.addEventListener('keydown', handleKeyDown);
            return () => window.removeEventListener('keydown', handleKeyDown);
        }, [toggleSidebar]);

        const contextValue = useMemo<SidebarContextState>(
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
                            'has-[[data-variant=inset]]:bg-sidebar',
                            className,
                        )}
                        ref={ref}
                        style={
                            {
                                '--sidebar-width': SIDEBAR_WIDTH,
                                '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
                                ...style,
                            } as CSSProperties
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

type SidebarProps = JSX.IntrinsicElements['div'] & {
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
export const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(
    ({ children, className, collapsible = 'offcanvas', side = 'left', variant = 'sidebar', ...props }, ref) => {
        const { isMobile, openMobile, state, setOpenMobile } = useSidebar();

        if (collapsible === 'none') {
            return (
                <div
                    className={cn(
                        'flex flex-col',
                        'h-full w-[--sidebar-width]',
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
                        className="w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
                        side={side}
                        style={
                            {
                                '--sidebar-width': SIDEBAR_WIDTH_MOBILE,
                            } as CSSProperties
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
                        'h-svh w-[--sidebar-width]',
                        'bg-transparent',
                        'duration-200 transition-[width] ease-linear',
                        'group-data-[collapsible=offcanvas]:w-0',
                        'group-data-[side=right]:rotate-180',
                        variant === 'floating' || variant === 'inset'
                            ? 'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]'
                            : 'group-data-[collapsible=icon]:w-[--sidebar-width-icon]',
                    )}
                />
                <div
                    className={cn(
                        'hidden',
                        'fixed inset-y-0 z-10',
                        'h-svh w-[--sidebar-width]',
                        'duration-200 transition-[left,right,width] ease-linear',
                        'md:flex',
                        side === 'left'
                            ? 'left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]'
                            : 'right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]',
                        // Adjust the padding for floating and inset variants.
                        variant === 'floating' || variant === 'inset'
                            ? 'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]'
                            : 'group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l',
                        className,
                    )}
                >
                    <div
                        data-sidebar="sidebar"
                        className={cn(
                            'flex flex-col',
                            'h-full w-full',
                            'bg-sidebar',
                            'group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow',
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
 * Trigger for the `Sidebar
 */
export const SidebarTrigger = forwardRef<ElementRef<typeof Button>, ComponentPropsWithoutRef<typeof Button>>(
    ({ className, onClick, ...props }, ref) => {
        const { toggleSidebar } = useSidebar();

        return (
            <Button
                data-sidebar="trigger"
                className={cn('size-7', className)}
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

export const SidebarRail = forwardRef<HTMLButtonElement, JSX.IntrinsicElements['button']>(
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
                    'group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full group-data-[collapsible=offcanvas]:hover:bg-sidebar',
                    '[[data-side=left][data-collapsible=offcanvas]_&]:-right-2',
                    '[[data-side=left][data-state=collapsed]_&]:cursor-e-resize',
                    '[[data-side=left]_&]:cursor-w-resize',
                    '[[data-side=right][data-collapsible=offcanvas]_&]:-left-2',
                    '[[data-side=right][data-state=collapsed]_&]:cursor-w-resize',
                    '[[data-side=right]_&]:cursor-e-resize',
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

export const SidebarInset = forwardRef<HTMLDivElement, JSX.IntrinsicElements['main']>(
    ({ children, className, ...props }, ref) => {
        return (
            <main
                className={cn(
                    'relative',
                    'flex-1 flex flex-col',
                    'min-h-svh',
                    'bg-background',
                    'peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))]',
                    'md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2',
                    'md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow',
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

// export const SidebarInput = forwardRef<ElementRef<typeof FormText>, ComponentPropsWithoutRef<typeof FormText>>(
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
export const SidebarHeader = forwardRef<HTMLDivElement, JSX.IntrinsicElements['div']>(
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
export const SidebarFooter = forwardRef<HTMLDivElement, JSX.IntrinsicElements['div']>(
    ({ children, className, ...props }, ref) => {
        return (
            <div data-sidebar="footer" className={cn('flex flex-col gap-2', 'p-2', className)} ref={ref} {...props}>
                {children}
            </div>
        );
    },
);
SidebarFooter.displayName = 'SidebarFooter';

export const SidebarSeparator = forwardRef<ElementRef<typeof Separator>, ComponentPropsWithoutRef<typeof Separator>>(
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

/**
 * Scrollable content
 */
export const SidebarContent = forwardRef<HTMLDivElement, JSX.IntrinsicElements['div']>(
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
