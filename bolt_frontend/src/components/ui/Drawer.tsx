import { X } from 'lucide-react';
import { cn } from '../../utils/cn';
import type { ReactNode } from 'react';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  position?: 'left' | 'right';
  className?: string;
}

export function Drawer({ open, onClose, title, children, position = 'right', className }: DrawerProps) {
  return (
    <>
      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm animate-fade-in"
            onClick={onClose}
          />
          <div
            className={cn(
              'fixed top-0 z-50 h-full w-full max-w-md bg-background shadow-xl animate-slide-in-right',
              position === 'left' && 'left-0 animate-slide-in-left',
              position === 'right' && 'right-0',
              className
            )}
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-border px-6 py-4">
                {title && <h2 className="text-lg font-semibold">{title}</h2>}
                <button
                  onClick={onClose}
                  className="ml-auto rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                {children}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
