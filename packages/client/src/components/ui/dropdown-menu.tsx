import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { CheckIcon, ChevronRightIcon, DotFilledIcon } from '@radix-ui/react-icons';
import * as React from 'react';
import { cn } from '@/utilities/cn';

export const DropdownMenu = DropdownMenuPrimitive.Root;

export const DropdownMenuCheckboxItem = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
    DropdownMenuPrimitive.DropdownMenuCheckboxItemProps
>(({ className, checked, children, ...props }, ref) => (
    <DropdownMenuPrimitive.CheckboxItem
        checked={checked}
        ref={ref}
        className={cn(
            'relative',
            'flex items-center',
            'rounded-sm outline-none',
            'py-1.5 pl-8 pr-2',
            'text-sm',
            'cursor-default select-none',
            'transition-colors',
            'focus:bg-accent focus:text-accent-foreground',
            'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
            className,
        )}
        {...props}
    >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
            <DropdownMenuPrimitive.ItemIndicator>
                <CheckIcon className="h-4 w-4" />
            </DropdownMenuPrimitive.ItemIndicator>
        </span>
        {children}
    </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName = 'DropdownMenuCheckboxItem';

export const DropdownMenuContent = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Content>,
    DropdownMenuPrimitive.DropdownMenuContentProps
>(({ className, children, sideOffset = 4, ...props }, ref) => (
    <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
            ref={ref}
            sideOffset={sideOffset}
            className={cn(
                'z-50 min-w-[8rem]',
                'overflow-hidden',
                'rounded-md border',
                'bg-popover shadow-md',
                'p-1',
                'text-popover-foreground',
                'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
                'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
                'data-[side=bottom]:slide-in-from-top-2',
                'data-[side=left]:slide-in-from-right-2',
                'data-[side=right]:slide-in-from-left-2',
                'data-[side=top]:slide-in-from-bottom-2',
                className,
            )}
            {...props}
        >
            {children}
        </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = 'DropdownMenuContent';

export const DropdownMenuGroup = DropdownMenuPrimitive.Group;

type DropdownMenuLabelProps = DropdownMenuPrimitive.DropdownMenuLabelProps & {
    inset?: boolean;
};
export const DropdownMenuLabel = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Label>,
    DropdownMenuLabelProps
>(({ className, children, inset, ...props }, ref) => (
    <DropdownMenuPrimitive.Label
        ref={ref}
        className={cn('px-2 py-1.5 text-sm font-semibold', inset && 'pl-8', className)}
        {...props}
    >
        {children}
    </DropdownMenuPrimitive.Label>
));
DropdownMenuLabel.displayName = 'DropdownMenuLabel';

type DropdownMenuItemProps = DropdownMenuPrimitive.DropdownMenuItemProps & {
    inset?: boolean;
};
export const DropdownMenuItem = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Item>,
    DropdownMenuItemProps
>(({ className, children, inset, ...props }, ref) => (
    <DropdownMenuPrimitive.Item
        ref={ref}
        className={cn(
            'relative',
            'flex items-center gap-2',
            'cursor-default select-none',
            'rounded-sm outline-none',
            'px-2 py-1.5',
            inset && 'pl-8',
            'text-sm',
            'transition-colors',
            'focus:bg-accent focus:text-accent-foreground',
            'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
            '[&>svg]:size-4 [&>svg]:shrink-0',
            className,
        )}
        {...props}
    >
        {children}
    </DropdownMenuPrimitive.Item>
));
DropdownMenuItem.displayName = 'DropdownMenuItem';

export const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

export const DropdownMenuRadioItem = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
    DropdownMenuPrimitive.DropdownMenuRadioItemProps
>(({ className, children, ...props }, ref) => (
    <DropdownMenuPrimitive.RadioItem
        ref={ref}
        className={cn(
            'relative',
            'flex items-center',
            'rounded-sm outline-none',
            'py-1.5 pl-8 pr-2',
            'text-sm',
            'cursor-default select-none',
            'transition-colors',
            'focus:bg-accent focus:text-accent-foreground',
            'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
            className,
        )}
        {...props}
    >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
            <DropdownMenuPrimitive.ItemIndicator>
                <DotFilledIcon className="h-4 w-4" />
            </DropdownMenuPrimitive.ItemIndicator>
        </span>
        {children}
    </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = 'DropdownMenuRadioItem';

export const DropdownMenuSeparator = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
    DropdownMenuPrimitive.DropdownMenuSeparatorProps
>(({ className, children, ...props }, ref) => (
    <DropdownMenuPrimitive.Separator ref={ref} className={cn('-mx-1 my-1 h-px bg-muted', className)} {...props}>
        {children}
    </DropdownMenuPrimitive.Separator>
));
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';

type DropdownMenuShortcutProps = React.PropsWithChildren<{
    className?: string;
}>;
export const DropdownMenuShortcut = React.forwardRef<HTMLSpanElement, DropdownMenuShortcutProps>(
    ({ className, children }, ref) => (
        <span ref={ref} className={cn('ml-auto text-xs tracking-widest opacity-60', className)}>
            {children}
        </span>
    ),
);
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';

export const DropdownMenuSub = DropdownMenuPrimitive.Sub;

export const DropdownMenuSubContent = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
    DropdownMenuPrimitive.DropdownMenuSubContentProps
>(({ className, children, ...props }, ref) => (
    <DropdownMenuPrimitive.SubContent
        ref={ref}
        className={cn(
            'z-50 min-w-[8rem]',
            'overflow-hidden',
            'rounded-md border shadow-lg',
            'bg-popover',
            'p-1',
            'text-popover-foreground',
            'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
            'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
            'data-[side=bottom]:slide-in-from-top-2',
            'data-[side=left]:slide-in-from-right-2',
            'data-[side=right]:slide-in-from-left-2',
            'data-[side=top]:slide-in-from-bottom-2',
            className,
        )}
        {...props}
    >
        {children}
    </DropdownMenuPrimitive.SubContent>
));
DropdownMenuSubContent.displayName = 'DropdownMenuSubContent';

type DropdownMenuSubTriggerProps = DropdownMenuPrimitive.DropdownMenuSubTriggerProps & {
    inset?: boolean;
};
export const DropdownMenuSubTrigger = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
    DropdownMenuSubTriggerProps
>(({ className, inset, children, ...props }, ref) => (
    <DropdownMenuPrimitive.SubTrigger
        ref={ref}
        className={cn(
            'flex gap-2 items-center',
            'px-2 py-1.5',
            inset && 'pl-8',
            'cursor-default select-none rounded-sm outline-none',
            'text-sm',
            'outline-none',
            'focus:bg-accent',
            'data-[state=open]:bg-accent',
            '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
            className,
        )}
        {...props}
    >
        {children}
        <ChevronRightIcon className="ml-auto" />
    </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName = 'DropdownMenuSubTrigger';

export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
