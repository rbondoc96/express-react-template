import * as React from 'react';
import { type HtmlProps } from '@/components/types';
import { cn } from '@/utilities/cn';

type SkeletonProps = HtmlProps<'div'>;

export function Skeleton({ children, className, ...props }: SkeletonProps): React.ReactNode {
    return (
        <div className={cn('animate-pulse rounded-md bg-primary/10', className)} {...props}>
            {children}
        </div>
    );
}
