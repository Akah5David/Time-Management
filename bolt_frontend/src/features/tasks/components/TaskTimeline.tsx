import { useState } from 'react';
import { format, differenceInDays, addDays } from 'date-fns';
import { cn } from '../../../utils/cn';
import type { Task } from '../../../types';

interface TaskTimelineProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  className?: string;
}

export function TaskTimeline({ tasks, onTaskClick, className }: TaskTimelineProps) {
  const [zoom, setZoom] = useState(1);

  if (tasks.length === 0) return null;

  const sortedTasks = [...tasks].sort((a, b) => {
    const aDate = a.dueDate ? new Date(a.dueDate) : new Date();
    const bDate = b.dueDate ? new Date(b.dueDate) : new Date();
    return aDate.getTime() - bDate.getTime();
  });

  const startDate = sortedTasks[0].dueDate ? new Date(sortedTasks[0].dueDate) : new Date();
  const endDate = sortedTasks[sortedTasks.length - 1].dueDate
    ? new Date(sortedTasks[sortedTasks.length - 1].dueDate!)
    : addDays(new Date(), 7);

  const totalDays = Math.max(differenceInDays(endDate, startDate), 1);

  const getPosition = (date: string | undefined) => {
    if (!date) return 0;
    const days = differenceInDays(new Date(date), startDate);
    return (days / totalDays) * 100;
  };

  const getWidth = (task: Task) => {
    const start = task.createdAt ? new Date(task.createdAt) : startDate;
    const end = task.dueDate ? new Date(task.dueDate) : addDays(start, 1);
    const days = Math.max(differenceInDays(end, start), 1);
    return Math.max((days / totalDays) * 100 * zoom, 2);
  };

  const statusColors: Record<string, string> = {
    Pending: 'bg-gray-400',
    'In Progress': 'bg-blue-500',
    Completed: 'bg-green-500',
    Cancelled: 'bg-red-400',
    Archived: 'bg-gray-500',
  };

  return (
    <div className={cn('rounded-xl border border-border bg-card p-4', className)}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Timeline</h3>
        <div className="flex gap-2">
          <button onClick={() => setZoom(z => Math.max(0.5, z - 0.25))} className="rounded-md border px-2 py-1 text-xs hover:bg-accent">-</button>
          <button onClick={() => setZoom(z => Math.min(3, z + 0.25))} className="rounded-md border px-2 py-1 text-xs hover:bg-accent">+</button>
        </div>
      </div>

      <div className="relative overflow-x-auto">
        <div className="min-w-[600px]">
          {/* Time scale */}
          <div className="mb-2 flex h-6 items-end border-b border-border pb-1">
            {Array.from({ length: Math.min(totalDays + 1, 30) }).map((_, i) => (
              <div key={i} className="flex-1 text-center text-[10px] text-muted-foreground">
                {format(addDays(startDate, i), 'MMM d')}
              </div>
            ))}
          </div>

          {/* Task bars */}
          <div className="space-y-2">
            {sortedTasks.map(task => (
              <div key={task.id} className="flex items-center gap-2">
                <span className="w-32 shrink-0 truncate text-xs font-medium">{task.title}</span>
                <div className="relative flex-1">
                  <button
                    onClick={() => onTaskClick(task)}
                    className={cn(
                      'absolute h-6 rounded-md text-[10px] text-white transition-opacity hover:opacity-80',
                      statusColors[task.status] || 'bg-gray-400'
                    )}
                    style={{
                      left: `${getPosition(task.createdAt || task.dueDate)}%`,
                      width: `${getWidth(task)}%`,
                    }}
                  >
                    <span className="truncate px-1">{task.title}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
