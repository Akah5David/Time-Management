import { cn } from '../../utils/cn';
import { STATUS_COLORS, PRIORITY_COLORS } from '../../constants';
import type { TaskStatus, Priority } from '../../types';

interface StatusBadgeProps {
  status: TaskStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        STATUS_COLORS[status] || STATUS_COLORS.Pending,
        className
      )}
    >
      {status}
    </span>
  );
}

interface PriorityBadgeProps {
  priority: Priority;
  className?: string;
}

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        PRIORITY_COLORS[priority] || PRIORITY_COLORS.Low,
        className
      )}
    >
      {priority}
    </span>
  );
}
