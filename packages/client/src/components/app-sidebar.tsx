import { Calendar, Home, Inbox, Search, Settings } from 'lucide-react';
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

type Item = {
    icon: React.ExoticComponent;
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

export function AppSidebar(): React.ReactNode {
    return (
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
    );
}
