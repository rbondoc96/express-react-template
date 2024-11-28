import { HomeIcon } from '@radix-ui/react-icons';
import { AnimatePresence, motion } from 'framer-motion';
import { LoaderCircle } from 'lucide-react';
import { type ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Link } from '@/components/link';
import { useMeQuery } from '@/hooks/queries/use-me-query';

export function AuthLayout(): ReactNode {
    const { data: user, isPending } = useMeQuery();

    return (
        <AnimatePresence>
            {isPending && (
                <motion.div
                    className="fixed inset-0 bg-transparent z-[9999]"
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
                    className="fixed inset-0 bg-background z-[9998]"
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
                    <div className="flex-1">
                        <div className="h-full p-6">
                            <div className="flex flex-col items-center">
                                <Link className="my-8" to="/">
                                    <HomeIcon className="h-8 w-8" />
                                </Link>
                                <div className="self-stretch">
                                    <Outlet />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
}
