import { Permission } from '@common/enums/Permission';
import Cookies from 'js-cookie';
import { LoaderCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import * as React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AdminSidebar } from '@/components/admin-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useMeQuery } from '@/hooks/queries/use-me-query';
import { useHasPermission } from '@/hooks/use-has-permission';

export function AdminLayout(): React.ReactNode {
    const { data: user, isPending } = useMeQuery();
    const canViewAdminPanel = useHasPermission(Permission.AccessAdminPanel);

    const sidebarDefaultOpen = React.useMemo<boolean>(() => Cookies.get('sidebar:state') === 'true', []);

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
            ) : !canViewAdminPanel ? (
                <Navigate to="/dashboard" />
            ) : (
                <SidebarProvider defaultOpen={sidebarDefaultOpen}>
                    <div className="min-h-screen flex-1 flex">
                        <AdminSidebar />
                        <div className="flex-1">
                            <Outlet />
                        </div>
                    </div>
                </SidebarProvider>
            )}
        </AnimatePresence>
    );
}
