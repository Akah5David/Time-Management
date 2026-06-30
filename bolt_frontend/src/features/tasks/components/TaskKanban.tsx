import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { cn } from '../../../utils/cn';
import { TaskCard } from './TaskCard';
import { Button } from '../../../components/ui/Button';
import type { Task, TaskStatus } from '../../../types';

interface TaskKanbanProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  onToggleComplete: (id: string, completed: boolean) => void;
  className?: string;
}

const columns: { id: TaskStatus; label: string; color: string }[] = [
  { id: 'Pending', label: 'To Do', color: 'bg-gray-100 dark:bg-gray-800' },
  { id: 'In Progress', label: 'In Progress', color: 'bg-blue-50 dark:bg-blue-900/20' },
  { id: 'Completed', label: 'Done', color: 'bg-green-50 dark:bg-green-900/20' },
];

export function TaskKanban({ tasks, onToggleComplete, className }: TaskKanbanProps) {
  const [activeColumn, setActiveColumn] = useState<TaskStatus | null>(null);

  const getTasksByStatus = (status: TaskStatus) =>
    tasks.filter(t => t.status === status);

  return (
    <div className={cn('flex gap-4 overflow-x-auto pb-4', className)}>
      {columns.map(column => {
        const columnTasks = getTasksByStatus(column.id);
        return (
          <div
            key={column.id}
            className={cn(
              'flex min-w-[300px] flex-1 flex-col rounded-xl border border-border',
              activeColumn === column.id && 'ring-2 ring-primary/20'
            )}
            onDragEnter={() => setActiveColumn(column.id)}
            onDragLeave={() => setActiveColumn(null)}
          >
            <div className={cn('flex items-center justify-between rounded-t-xl px-4 py-3', column.color)}>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm">{column.label}</h3>
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-background text-xs font-medium">
                  {columnTasks.length}
                </span>
              </div>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 space-y-2 p-3">
              {columnTasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggleComplete={onToggleComplete}
                />
              ))}
              {columnTasks.length === 0 && (
                <div className="flex h-24 items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground">
                  No tasks
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
