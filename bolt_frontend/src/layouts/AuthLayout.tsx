import { Link, Outlet } from 'react-router-dom';
import { ListTodo } from 'lucide-react';

export function AuthLayout() {
  return (
    <div className="flex min-h-screen bg-background">
      <div className="hidden w-1/2 flex-col justify-between bg-primary p-12 text-primary-foreground lg:flex">
        <div>
          <Link to="/" className="flex items-center gap-2">
            <ListTodo className="h-8 w-8" />
            <span className="text-2xl font-bold">TaskFlow</span>
          </Link>
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Manage your tasks with ease</h2>
          <p className="text-primary-foreground/80">
            A modern task management platform designed for teams and individuals who want to stay organized and productive.
          </p>
        </div>
        <p className="text-sm text-primary-foreground/60">&copy; {new Date().getFullYear()} TaskFlow. All rights reserved.</p>
      </div>
      <div className="flex w-full flex-col items-center justify-center p-6 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center justify-center gap-2 lg:hidden">
            <ListTodo className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">TaskFlow</span>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
