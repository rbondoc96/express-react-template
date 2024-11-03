import { Permission } from '@common/enums/Permission';
import { Calendar, Home, Inbox, Layers, Search, Settings } from 'lucide-react';
import * as React from 'react';
import { Link } from '@/components/ui/link';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useHasPermission } from '@/hooks/use-has-permission';

type Item = {
    icon: React.ExoticComponent;
    title: string;
    url: string;
};

const items: Item[] = [
    {
        icon: Home,
        title: 'Home',
        url: '/dashboard',
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

export function AppSidebar(): React.ReactNode {
    const canViewAdminPanel = useHasPermission(Permission.AccessAdminPanel);

    return (
        <Sidebar collapsible="icon">
            <SidebarContent>
                <SidebarGroup className="p-4">
                    <SidebarGroupContent>
                        <SidebarMenu className="gap-2">
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
            <SidebarFooter className="p-4">
                <SidebarMenu className="gap-2">
                    {canViewAdminPanel && (
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link to="/admin">
                                    <Layers />
                                    <span>Admin Panel</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    )}
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link to="/settings">
                                <Settings />
                                <span>Settings</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
