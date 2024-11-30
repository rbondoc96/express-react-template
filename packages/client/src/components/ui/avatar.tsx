import { createAvatar } from '@dicebear/core';
import * as initials from '@dicebear/initials';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import * as React from 'react';
import { type User } from '@/api/parsers/userParser';
import { cn } from '@/utilities/cn';

type AvatarProps = Omit<AvatarPrimitive.AvatarProps, 'children'> & {
    user: User;
};
export const Avatar = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Root>, AvatarProps>(
    ({ className, user, ...props }, ref) => {
        const dataUri = React.useMemo(() => {
            const firstInitial = user.first_name[0] ?? '';
            const lastInitial = user.last_name[0] ?? '';

            return createAvatar(initials, {
                fontSize: 42,
                seed: `${firstInitial} ${lastInitial}`,
            }).toDataUri();
        }, [user]);

        return (
            <AvatarPrimitive.Root
                ref={ref}
                className={cn('relative flex size-8 shrink-0 overflow-hidden rounded-full', className)}
                {...props}
            >
                <AvatarImage alt={`${user.first_name} ${user.last_name}`} src={dataUri.toString()} />
            </AvatarPrimitive.Root>
        );
    },
);
Avatar.displayName = 'Avatar';

const AvatarFallback = React.forwardRef<
    React.ElementRef<typeof AvatarPrimitive.Fallback>,
    AvatarPrimitive.AvatarFallbackProps
>(({ className, children, ...props }, ref) => (
    <AvatarPrimitive.Fallback
        ref={ref}
        className={cn('flex h-full w-full items-center justify-center rounded-full bg-muted', className)}
        {...props}
    >
        {children}
    </AvatarPrimitive.Fallback>
));
AvatarFallback.displayName = 'AvatarFallback';

const AvatarImage = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Image>, AvatarPrimitive.AvatarImageProps>(
    ({ className, ...props }, ref) => (
        <AvatarPrimitive.Image ref={ref} className={cn('aspect-square h-full w-full', className)} {...props} />
    ),
);
AvatarImage.displayName = 'AvatarImage';
