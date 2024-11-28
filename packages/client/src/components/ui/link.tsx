import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { IconButton } from '@/components/buttons/icon-button';
import { SolidButton } from '@/components/buttons/solid-button';
import { HtmlProps } from '@/components/types';
import { cn } from '@/utilities/cn';

const styles = cva(['text-accent-foreground hover:underline'], {
    variants: {
        variant: {
            'icon-button': ['hover:no-underline'],
            'solid-button': ['text-primary-foreground', 'hover:no-underline'],
        },
    },
});

type PickedProps = Omit<HtmlProps<'a'>, 'rel' | 'target'>;

type LinkProps = PickedProps &
    VariantProps<typeof styles> & {
        // Accepts any string, but gives intellisense for 'noreferrer'
        rel?: 'noreferrer' | (string & {});
        target?: '_blank' | '_self' | '_parent' | '_top';
        to?: string;
        viewTransition?: boolean;
    };

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
    ({ children, className, href, rel, target, to, variant, viewTransition, ...props }, ref) => {
        const composedClassName = cn(styles({ variant: variant }), className);

        const Component =
            to !== undefined ? (
                <RouterLink to={to} className={composedClassName} viewTransition={viewTransition} {...props}>
                    {children}
                </RouterLink>
            ) : (
                <a className={composedClassName} href={href} ref={ref} rel={rel} target={target} {...props}>
                    {children}
                </a>
            );

        if (variant === 'icon-button') {
            return <IconButton asChild>{Component}</IconButton>;
        }

        if (variant === 'solid-button') {
            return <SolidButton asChild>{Component}</SolidButton>;
        }

        return Component;
    },
);

Link.displayName = 'Link';
