import { cva } from 'class-variance-authority';
import { forwardRef, type JSX } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { IconButton } from '@/components/buttons/icon-button';
import { SolidButton } from '@/components/buttons/solid-button';
import { cn } from '@/utilities/cn';

const styles = cva(['text-accent hover:text-accent-hover']);

type HtmlAnchorProps = JSX.IntrinsicElements['a'];
type PickedProps = Omit<HtmlAnchorProps, 'rel' | 'target'>;

type LinkProps = PickedProps & {
    // Accepts any string, but gives intellisense for 'noreferrer'
    rel?: 'noreferrer' | (string & {});
    target?: '_blank' | '_self' | '_parent' | '_top';
    to?: string;
    variant?: 'icon-button' | 'solid-button';
    viewTransition?: boolean;
};

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
    ({ children, className, href, rel, target, to, variant, viewTransition, ...props }, ref) => {
        const composedClassName = cn(styles(), className);

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
