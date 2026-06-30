import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, Paperclip, CheckCircle2, Circle, MessageSquare, EyeOff } from 'lucide-react';
import { cn } from '../../../utils/cn';
import { StatusBadge, PriorityBadge } from '../../../components/ui/StatusBadge';
import { ProgressBar } from '../../../components/ui/ProgressBar';
import type { Task } from '../../../types';

interface TaskCardProps {
  task: Task;
  onToggleComplete?: (id: string, completed: boolean) => void;
  className?: string;
}

export function TaskCard({ task, onToggleComplete, className }: TaskCardProps) {
  const completedSubtasks = task.subtasks?.filter(s => s.completed).length || 0;
  const totalSubtasks = task.subtasks?.length || 0;
  const progress = totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'Completed';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={cn(
        'group relative rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/20 hover:shadow-md',
        isOverdue && 'border-red-200 dark:border-red-900/30',
        !task.published && 'opacity-75',
        className
      )}
    >
      {!task.published && (
        <div className="absolute -top-2 right-4 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
          Draft
        </div>
      )}
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggleComplete?.(task.id, task.status !== 'Completed')}
          className={cn(
            'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
            task.status === 'Completed'
              ? 'border-green-500 bg-green-500 text-white'
              : 'border-muted-foreground/30 hover:border-primary'
          )}
        >
          {task.status === 'Completed' && <CheckCircle2 className="h-3.5 w-3.5" />}
        </button>

        <div className="min-w-0 flex-1">
          <Link
            to={`/tasks/${task.id}`}
            className={cn(
              'block text-sm font-medium transition-colors hover:text-primary',
              task.status === 'Completed' && 'text-muted-foreground line-through'
            )}
          >
            {task.title}
          </Link>

          {task.description && (
            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{task.description}</p>
          )}

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <StatusBadge status={task.status} />
            <PriorityBadge priority={task.priority} />

            {task.labels?.map(label => (
              <span
                key={label.id}
                className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
                style={{ backgroundColor: `${label.color}20`, color: label.color }}
              >
                {label.name}
              </span>
            ))}
          </div>

          <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
            {task.dueDate && (
              <span className={cn('flex items-center gap-1', isOverdue && 'text-red-500')}>
                <Calendar className="h-3.5 w-3.5" />
                {new Date(task.dueDate).toLocaleDateString()}
              </span>
            )}
            {task.estimatedTime && (
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {task.estimatedTime}h
              </span>
            )}
            {task.attachments && task.attachments.length > 0 && (
              <span className="flex items-center gap-1">
                <Paperclip className="h-3.5 w-3.5" />
                {task.attachments.length}
              </span>
            )}
            {task.comments && task.comments.length > 0 && (
              <span className="flex items-center gap-1">
                <MessageSquare className="h-3.5 w-3.5" />
                {task.comments.length}
              </span>
            )}
            {!task.published && (
              <span className="flex items-center gap-1 text-amber-500">
                <EyeOff className="h-3.5 w-3.5" />
                Draft
              </span>
            )}
          </div>

          {totalSubtasks > 0 && (
            <div className="mt-3">
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{completedSubtasks}/{totalSubtasks} subtasks</span>
                <span className="text-muted-foreground">{Math.round(progress)}%</span>
              </div>
              <ProgressBar value={progress} size="sm" />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
