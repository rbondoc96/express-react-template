import { LoaderCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { type ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useMeQuery } from '@/hooks/queries/use-me-query';

export function AuthLayout(): ReactNode {
    const { data: user, isPending } = useMeQuery();

    return (
        <AnimatePresence>
            {isPending && (
                <motion.div
                    className="fixed inset-0 bg-transparent z-9999"
                    key="splash-loader"
                    exit={{
                        opacity: 0,
                        transition: {
                            ease: 'easeInOut',
                            duration: 0.25,
                        },
                    }}
                >
                    <div className="h-full flex flex-col items-center justify-center">
                        <LoaderCircle className="animate-spin text-black size-8" />
                    </div>
                </motion.div>
            )}
            {isPending ? (
                <motion.div
                    className="fixed inset-0 bg-background z-9998"
                    key="splash"
                    exit={{
                        opacity: 0,
                        transition: {
                            ease: 'easeIn',
                            duration: 0.5,
                        },
                    }}
                />
            ) : user ? (
                <Navigate to="/dashboard" />
            ) : (
                <div className="flex min-h-screen">
                    <div className="flex-1 bg-gray-500" />
                    <Outlet />
                </div>
            )}
        </AnimatePresence>
    );
}
