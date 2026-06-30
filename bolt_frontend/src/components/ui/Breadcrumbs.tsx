import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '../../utils/cn';

interface BreadcrumbsProps {
  className?: string;
  customLabels?: Record<string, string>;
}

export function Breadcrumbs({ className, customLabels = {} }: BreadcrumbsProps) {
  const location = useLocation();
  const paths = location.pathname.split('/').filter(Boolean);

  const getLabel = (path: string, index: number) => {
    if (customLabels[path]) return customLabels[path];
    if (customLabels[location.pathname]) return customLabels[location.pathname];
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <nav className={cn('flex items-center gap-1 text-sm text-muted-foreground', className)}>
      <Link to="/" className="flex items-center hover:text-foreground transition-colors">
        <Home className="h-4 w-4" />
      </Link>
      {paths.map((path, index) => {
        const href = '/' + paths.slice(0, index + 1).join('/');
        const isLast = index === paths.length - 1;
        return (
          <span key={href} className="flex items-center gap-1">
            <ChevronRight className="h-4 w-4" />
            {isLast ? (
              <span className="font-medium text-foreground">{getLabel(path, index)}</span>
            ) : (
              <Link to={href} className="hover:text-foreground transition-colors">
                {getLabel(path, index)}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
