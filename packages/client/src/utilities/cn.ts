import { cx } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

type ClassValue = Parameters<typeof cx>[0];

export function cn(...classes: ClassValue[]): string {
    return twMerge(cx(...classes));
}
