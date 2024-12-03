import { Slot } from '@radix-ui/react-slot';
import { ChevronRight, MoreHorizontal } from 'lucide-react';
import * as React from 'react';
import { type HtmlProps } from '@/components/types';
import { cn } from '@/utilities/cn';

type BreadcrumbProps = HtmlProps<'nav'> & {
    separator?: React.ReactNode;
};
export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(({ children, ...props }, ref) => {
    return (
        <nav aria-label="breadcrumb" ref={ref} {...props}>
            {children}
        </nav>
    );
});
Breadcrumb.displayName = 'Breadcrumb';

export const BreadcrumbEllipsis = React.forwardRef<HTMLSpanElement, Omit<HtmlProps<'span'>, 'children'>>(
    ({ className, ...props }, ref) => {
        return (
            <span
                aria-hidden="true"
                className={cn('flex h-9 w-9 items-center justify-center', className)}
                ref={ref}
                role="presentation"
                {...props}
            >
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More</span>
            </span>
        );
    },
);
BreadcrumbEllipsis.displayName = 'BreadcrumbEllipsis';

export const BreadcrumbItem = React.forwardRef<HTMLLIElement, HtmlProps<'li'>>(
    ({ children, className, ...props }, ref) => {
        return (
            <li className={cn('inline-flex items-center gap-1.5', className)} ref={ref} {...props}>
                {children}
            </li>
        );
    },
);
BreadcrumbItem.displayName = 'BreadcrumbItem';

type BreadcrumbLinkProps = HtmlProps<'a'> & {
    asChild?: boolean;
};
export const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
    ({ asChild, children, className, ...props }, ref) => {
        const Component = asChild ? Slot : 'a';

        return (
            <Component className={cn('transition-colors hover:text-foreground', className)} ref={ref} {...props}>
                {children}
            </Component>
        );
    },
);
BreadcrumbLink.displayName = 'BreadcrumbLink';

export const BreadcrumbList = React.forwardRef<HTMLOListElement, HtmlProps<'ol'>>(
    ({ children, className, ...props }, ref) => (
        <ol
            ref={ref}
            className={cn(
                'flex flex-wrap items-center break-words text-sm text-muted-foreground sm:gap-1.5',
                className,
            )}
            {...props}
        >
            {children}
        </ol>
    ),
);
BreadcrumbList.displayName = 'BreadcrumbList';

export const BreadcrumbPage = React.forwardRef<HTMLSpanElement, HtmlProps<'span'>>(
    ({ children, className, ...props }, ref) => {
        return (
            <span
                aria-disabled="true"
                aria-current="page"
                className={cn('font-normal text-foreground', className)}
                ref={ref}
                role="link"
                {...props}
            >
                {children}
            </span>
        );
    },
);
BreadcrumbPage.displayName = 'BreadcrumbPage';

export const BreadcrumbSeparator = React.forwardRef<HTMLLIElement, HtmlProps<'li'>>(
    ({ children, className, ...props }, ref) => {
        return (
            <li
                aria-hidden="true"
                className={cn('[&>svg]:w-3.5 [&>svg]:h-3.5', className)}
                ref={ref}
                role="presentation"
                {...props}
            >
                {children ?? <ChevronRight />}
            </li>
        );
    },
);
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';
