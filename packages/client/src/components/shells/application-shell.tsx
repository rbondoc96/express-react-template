import { CircleUserRound } from 'lucide-react';
import * as React from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useLogoutMutation } from '@/hooks/mutations/use-logout-mutation';

export type HeaderConfig = {
    breadcrumbs: Array<{
        label: string;
        to: string;
    }>;
};

type AppShellProps = React.PropsWithChildren<{
    headerConfig?: HeaderConfig;
}>;
export function ApplicationShell({ children, headerConfig }: AppShellProps): React.ReactNode {
    const { mutateAsync: logout } = useLogoutMutation();

    const onClickLogout = React.useCallback(async () => {
        await logout();
    }, [logout]);

    return (
        <React.Fragment>
            <header className="border-b border-black px-3 py-3">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                        <SidebarTrigger />
                        {headerConfig?.breadcrumbs && (
                            <Breadcrumb>
                                <BreadcrumbList>
                                    {headerConfig.breadcrumbs.map((item, index) => {
                                        const showSeparator = index !== headerConfig.breadcrumbs.length - 1;

                                        return (
                                            <React.Fragment key={item.to}>
                                                <BreadcrumbItem>
                                                    <BreadcrumbLink href={item.to}>{item.label}</BreadcrumbLink>
                                                </BreadcrumbItem>
                                                {showSeparator && <BreadcrumbSeparator />}
                                            </React.Fragment>
                                        );
                                    })}
                                </BreadcrumbList>
                            </Breadcrumb>
                        )}
                    </div>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button size="icon" variant="ghost">
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
            <main className="px-3 py-2">{children}</main>
        </React.Fragment>
    );
}
