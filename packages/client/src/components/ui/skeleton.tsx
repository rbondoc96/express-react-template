import { type JSX } from 'react';
import { cn } from '@/utilities/cn';

type SkeletonProps = JSX.IntrinsicElements['div'];

export function Skeleton({ children, className, ...props }: SkeletonProps) {
    return (
        <div className={cn('animate-pulse rounded-md bg-primary/10', className)} {...props}>
            {children}
        </div>
    );
}
