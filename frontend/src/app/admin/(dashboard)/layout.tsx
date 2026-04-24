"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Settings, 
  Search,
  Bell,
  MessageSquare,
  ChevronDown,
  Diamond,
  Store,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  User as UserIcon
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, token, logout, initialize } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    initialize();
    setIsMounted(true);
  }, [initialize]);

  useEffect(() => {
    if (isMounted && !token) {
      router.push("/admin/login");
    }
  }, [isMounted, token, router]);

  if (!isMounted || !token) {
    return null; // or a loading spinner
  }

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Products", href: "/admin/inventory", icon: Package },
    { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
    { name: "Branches", href: "/admin/branches", icon: Store },
  ];

  const systemItems = [
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-muted/40 flex font-sans">
      {/* Sidebar */}
      <aside className={`bg-background border-r flex flex-col hidden lg:flex transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
        <div className={`h-16 flex items-center border-b ${isCollapsed ? 'justify-center' : 'px-6 justify-between'}`}>
          <div className="flex items-center">
            <div className={`bg-brand p-2 rounded-md flex items-center justify-center ${isCollapsed ? '' : 'mr-3'}`}>
              <Diamond className="w-4 h-4 text-white" fill="currentColor" />
            </div>
            {!isCollapsed && (
              <div>
                <span className="block text-base font-bold leading-none">GJ 5 Admin</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 flex flex-col">
          <nav className={`space-y-1 flex-1 ${isCollapsed ? 'px-2' : 'px-4'}`}>
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={buttonVariants({
                    variant: isActive ? "secondary" : "ghost",
                    className: `w-full justify-start ${isCollapsed ? 'justify-center px-0' : ''} ${isActive ? 'bg-red-50 text-brand hover:bg-red-100' : 'text-muted-foreground'}`
                  })}
                  title={isCollapsed ? item.name : undefined}
                >
                  {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-brand rounded-r-md"></div>}
                  <item.icon className={`w-5 h-5 ${isCollapsed ? '' : 'mr-3'} ${isActive ? 'text-brand' : ''}`} />
                  {!isCollapsed && <span>{item.name}</span>}
                </Link>
              );
            })}
          </nav>

          <div className={`mt-8 ${isCollapsed ? 'px-2' : 'px-4'}`}>
            {!isCollapsed && <h3 className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">System</h3>}
            <nav className="space-y-1">
              {systemItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={buttonVariants({
                      variant: isActive ? "secondary" : "ghost",
                      className: `w-full justify-start ${isCollapsed ? 'justify-center px-0' : ''} ${isActive ? 'bg-red-50 text-brand hover:bg-red-100' : 'text-muted-foreground'}`
                    })}
                    title={isCollapsed ? item.name : undefined}
                  >
                    <item.icon className={`w-5 h-5 ${isCollapsed ? '' : 'mr-3'} ${isActive ? 'text-brand' : ''}`} />
                    {!isCollapsed && <span>{item.name}</span>}
                  </Link>
                );
              })}
              <Button 
                variant="ghost" 
                className={`w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700 ${isCollapsed ? 'justify-center px-0' : ''}`}
                onClick={handleLogout}
                title={isCollapsed ? "Log Out" : undefined}
              >
                <LogOut className={`w-5 h-5 ${isCollapsed ? '' : 'mr-3'}`} />
                {!isCollapsed && <span>Log Out</span>}
              </Button>
            </nav>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-background border-b flex items-center justify-between px-4 lg:px-8">
          <div className="flex-1 flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsCollapsed(!isCollapsed)} 
              className="hidden lg:flex text-muted-foreground"
            >
              {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            <div className="relative w-full max-w-md hidden md:block">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>
              <Input
                type="text"
                className="pl-9 bg-muted border-none h-9"
                placeholder="Search global..."
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-brand ring-2 ring-background"></span>
            </Button>
            <Button variant="ghost" size="icon">
              <MessageSquare className="h-5 w-5 text-muted-foreground" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="ghost" className="flex items-center gap-2 pl-2 pr-2">
                    <span className="text-sm font-medium hidden sm:block">Bandra Branch</span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </Button>
                }
              />
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Select Branch</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Bandra Branch</DropdownMenuItem>
                <DropdownMenuItem>Andheri Branch</DropdownMenuItem>
                <DropdownMenuItem>Juhu Branch</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full border-2 border-transparent hover:border-gray-200 focus:outline-none focus:border-brand transition-all p-0">
                    <Avatar className="h-full w-full">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-red-100 text-red-600 font-bold text-sm">
                        {user?.name?.charAt(0) || "A"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                }
              />
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name || "Admin User"}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email || "admin@gj5.com"}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  render={
                    <Link href="/admin/settings">
                      <UserIcon className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  }
                />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4 text-red-600" />
                  <span className="text-red-600">Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
