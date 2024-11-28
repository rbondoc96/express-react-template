import Cookies from 'js-cookie';
import { CircleUserRound, LoaderCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import * as React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AppSidebar } from '@/components/app-sidebar';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { useLogoutMutation } from '@/hooks/mutations/use-logout-mutation';
import { useMeQuery } from '@/hooks/queries/use-me-query';

export function AppLayout(): React.ReactNode {
    const { mutateAsync: logout } = useLogoutMutation();
    const { data: user, isPending } = useMeQuery();

    const sidebarDefaultOpen = React.useMemo<boolean>(() => Cookies.get('sidebar:state') === 'true', []);

    const onClickLogout = React.useCallback(async () => {
        await logout();
    }, [logout]);

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
            ) : !user ? (
                <Navigate to="/login" />
            ) : (
                <SidebarProvider defaultOpen={sidebarDefaultOpen}>
                    <div className="min-h-screen flex-1 flex">
                        <AppSidebar />
                        <main className="flex-1">
                            <header className="border-b border-gray-300 px-3 py-2.5">
                                <div className="flex justify-between items-center">
                                    <SidebarTrigger />
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button className="size-7" size="icon" variant="ghost">
                                                <CircleUserRound />
                                                <span className="sr-only">User Menu</span>
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent align="end">
                                            <div className="flex flex-col gap-4">
                                                <Button variant="ghost" onClick={onClickLogout}>
                                                    Log Out
                                                </Button>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </header>
                            <div className="px-2 py-2">
                                <Outlet />
                            </div>
                        </main>
                    </div>
                </SidebarProvider>
            )}
        </AnimatePresence>
    );
}
