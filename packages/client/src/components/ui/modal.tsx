import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/utilities/cn';

type ModalProps = React.PropsWithChildren<{
    open: boolean;
    onOpenChange: (value: boolean) => void;
}>;
export function Modal({ children, open, onOpenChange }: ModalProps): React.ReactNode {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">{children}</DialogContent>
        </Dialog>
    );
}

type ModalContent = React.PropsWithChildren<{
    className?: string;
}>;
export function ModalContent({ children, className }: ModalContent): React.ReactNode {
    return <div className={cn('my-2', className)}>{children}</div>;
}

type ModalFooterProps = React.PropsWithChildren<{
    className?: string;
}>;
export function ModalFooter({ children, className }: ModalFooterProps): React.ReactNode {
    return (
        <DialogFooter className={cn('sm:justify-start', className)}>
            <DialogClose asChild>
                <Button type="button" variant="secondary">
                    Close
                </Button>
            </DialogClose>
            {children}
        </DialogFooter>
    );
}

type ModalHeaderProps = {
    className?: string;
    description?: string;
    title: string;
};
export function ModalHeader({ className, description, title }: ModalHeaderProps): React.ReactNode {
    return (
        <DialogHeader className={className}>
            <DialogTitle>{title}</DialogTitle>
            {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
    );
}
