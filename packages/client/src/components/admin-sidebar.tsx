import { Home, LayoutDashboard, Settings } from 'lucide-react';
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

export function AdminSidebar(): React.ReactNode {
    return (
        <Sidebar collapsible="icon">
            <SidebarContent>
                <SidebarGroup className="p-4">
                    <SidebarGroupContent>
                        <SidebarMenu className="gap-2">
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link to="/admin">
                                        <Home />
                                        <span>Home</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="p-4">
                <SidebarMenu className="gap-2">
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link to="/dashboard">
                                <LayoutDashboard />
                                <span>User Dashboard</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
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
