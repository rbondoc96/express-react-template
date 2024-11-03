import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { HtmlProps } from '@/components/types';
import { cn } from '@/utilities/cn';

type PickedProps = Omit<HtmlProps<'a'>, 'rel' | 'target'>;

type LinkProps = PickedProps & {
    // Accepts any string, but gives intellisense for 'noreferrer'
    rel?: 'noreferrer' | (string & {});
    target?: '_blank' | '_self' | '_parent' | '_top';
    to?: string;
    viewTransition?: boolean;
};

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
    ({ children, className, href, rel, target, to, viewTransition, ...props }, ref) => {
        const composedClassName = cn('text-accent-foreground', className);

        return to !== undefined ? (
            <RouterLink to={to} className={composedClassName} viewTransition={viewTransition} {...props}>
                {children}
            </RouterLink>
        ) : (
            <a className={composedClassName} href={href} ref={ref} rel={rel} target={target} {...props}>
                {children}
            </a>
        );
    },
);

Link.displayName = 'Link';
