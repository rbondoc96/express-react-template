import { AnimatePresence, motion } from 'framer-motion';
import Cookies from 'js-cookie';
import { Calendar, CircleUserRound, Home, Inbox, LoaderCircle, Search, Settings } from 'lucide-react';
import { type ExoticComponent, type ReactNode, useMemo } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Button } from '@/components/button';
import { Link } from '@/components/link';
import { Sidebar, SidebarContent, SidebarFooter, SidebarProvider, SidebarTrigger } from '@/components/sidebar/sidebar';
import { SidebarGroup, SidebarGroupContent } from '@/components/sidebar/sidebar-group';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/sidebar/sidebar-menu';
import { useMeQuery } from '@/hooks/queries/use-me-query';

type Item = {
    icon: ExoticComponent;
    title: string;
    url: string;
};

const items: Item[] = [
    {
        icon: Home,
        title: 'Home',
        url: '#',
    },
    {
        icon: Inbox,
        title: 'Inbox',
        url: '#',
    },
    {
        icon: Calendar,
        title: 'Calendar',
        url: '#',
    },
    {
        icon: Search,
        title: 'Search',
        url: '#',
    },
];

export function AppLayout(): ReactNode {
    const { data: user, isPending } = useMeQuery();
    const sidebarDefaultOpen = useMemo<boolean>(() => Cookies.get('sidebar:state') === 'true', []);

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
                        <Sidebar collapsible="icon">
                            <SidebarContent>
                                <SidebarGroup>
                                    <SidebarGroupContent>
                                        <SidebarMenu>
                                            {items.map((item) => (
                                                <SidebarMenuItem key={item.title}>
                                                    <SidebarMenuButton asChild>
                                                        <Link to={item.url}>
                                                            <item.icon />
                                                            <span>{item.title}</span>
                                                        </Link>
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
                                            ))}
                                        </SidebarMenu>
                                    </SidebarGroupContent>
                                </SidebarGroup>
                            </SidebarContent>
                            <SidebarFooter>
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <a href="#">
                                                <Settings />
                                                <span>Settings</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </SidebarFooter>
                        </Sidebar>
                        <main className="flex-1">
                            <header className="border-b border-gray-300 px-3 py-2.5">
                                <div className="flex justify-between items-center">
                                    <SidebarTrigger />
                                    <Button className="size-7" size="icon" variant="ghost">
                                        <CircleUserRound />
                                        <span className="sr-only">User Menu</span>
                                    </Button>
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
