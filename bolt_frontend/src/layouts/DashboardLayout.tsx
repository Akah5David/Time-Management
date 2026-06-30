import { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import {
  LayoutDashboard, ListTodo, FolderKanban, Tag, Bell, Settings, User, LogOut,
  Menu, X, ChevronLeft, ChevronRight, Search, BarChart3, Shield, CheckSquare,
  Paperclip, Activity
} from 'lucide-react';
import { cn } from '../utils/cn';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Avatar } from '../components/ui/Avatar';
import { Tooltip } from '../components/ui/Tooltip';
import { Button } from '../components/ui/Button';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'Tasks', icon: ListTodo, path: '/tasks' },
  { label: 'Projects', icon: FolderKanban, path: '/projects' },
  { label: 'Labels', icon: Tag, path: '/labels' },
];

const bottomNavItems = [
  { label: 'Notifications', icon: Bell, path: '/notifications' },
  { label: 'Settings', icon: Settings, path: '/settings' },
  { label: 'Profile', icon: User, path: '/profile' },
];

const adminNavItems = [
  { label: 'Analytics', icon: BarChart3, path: '/analytics' },
  { label: 'Reminders', icon: Bell, path: '/reminders' },
  { label: 'Subtasks', icon: CheckSquare, path: '/subtasks' },
  { label: 'Attachments', icon: Paperclip, path: '/attachments' },
  { label: 'Activity', icon: Activity, path: '/activity' },
];

export function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { user, logout, isAdmin, switchRole } = useAuth();
  const { toggleTheme, resolvedTheme } = useTheme();

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex flex-col border-r border-border bg-card transition-all duration-300 lg:static',
          collapsed ? 'w-[72px]' : 'w-64',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-border px-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary">
            <ListTodo className="h-5 w-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <span className="text-lg font-bold text-foreground">TaskFlow</span>
          )}
          <button
            onClick={() => setMobileOpen(false)}
            className="ml-auto lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search */}
        {!collapsed && (
          <div className="px-4 py-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="h-9 w-full rounded-md border border-input bg-background py-2 pl-9 pr-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          </div>
        )}

        {/* Main Nav */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
          {navItems.map(item => {
            const active = isActive(item.path);
            return collapsed ? (
              <Tooltip key={item.path} content={item.label} side="right">
                <Link
                  to={item.path}
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-md transition-colors',
                    active
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                  )}
                >
                  <item.icon className="h-5 w-5" />
                </Link>
              </Tooltip>
            ) : (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                  active
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}

          {/* Admin Section */}
          {isAdmin && (
            <>
              {!collapsed && (
                <div className="mt-4 mb-2 px-3 text-xs font-semibold uppercase text-muted-foreground">
                  Admin
                </div>
              )}
              {adminNavItems.map(item => {
                const active = isActive(item.path);
                return collapsed ? (
                  <Tooltip key={item.path} content={item.label} side="right">
                    <Link
                      to={item.path}
                      className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-md transition-colors',
                        active
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                    </Link>
                  </Tooltip>
                ) : (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                      active
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                );
              })}
            </>
          )}
        </nav>

        {/* Bottom Nav */}
        <div className="space-y-1 border-t border-border px-3 py-2">
          {bottomNavItems.map(item => {
            const active = isActive(item.path);
            return collapsed ? (
              <Tooltip key={item.path} content={item.label} side="right">
                <Link
                  to={item.path}
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-md transition-colors',
                    active
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                  )}
                >
                  <item.icon className="h-5 w-5" />
                </Link>
              </Tooltip>
            ) : (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                  active
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* User */}
        <div className="border-t border-border p-3">
          {collapsed ? (
            <Tooltip content={user?.username || 'User'} side="right">
              <button onClick={logout} className="flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground">
                <Avatar size="sm" fallback={user?.username} />
              </button>
            </Tooltip>
          ) : (
            <div className="flex items-center gap-3 rounded-md p-2 hover:bg-accent">
              <Avatar size="sm" fallback={user?.username} />
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium">{user?.username}</p>
                <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
              </div>
              <button
                onClick={logout}
                className="text-muted-foreground hover:text-foreground"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex h-8 w-full items-center justify-center border-t border-border text-muted-foreground hover:text-foreground"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Top bar */}
        <header className="flex h-16 items-center gap-4 border-b border-border bg-card/50 px-4 lg:px-6">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="ml-auto flex items-center gap-3">
            {/* Role Switcher for Demo */}
            <Button variant="outline" size="sm" onClick={switchRole} className="hidden sm:flex">
              <Shield className="mr-2 h-4 w-4" />
              {isAdmin ? 'Admin' : 'User'}
            </Button>
            <button
              onClick={toggleTheme}
              className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              {resolvedTheme === 'dark' ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
