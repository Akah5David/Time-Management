import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, CheckCircle2, Upload, FolderKanban, Tag, ListTodo, Bell } from 'lucide-react';
import { useActivity } from '../../../hooks/useActivity';
import { Skeleton } from '../../../components/ui/Skeleton';
import { EmptyState } from '../../../components/ui/EmptyState';
import { cn } from '../../../utils/cn';
import type { Activity } from '../../../types';

const actionIcons: Record<string, typeof Plus> = {
  created: Plus,
  updated: Pencil,
  deleted: Trash2,
  completed: CheckCircle2,
  uploaded: Upload,
};

const entityIcons: Record<string, typeof ListTodo> = {
  task: ListTodo,
  project: FolderKanban,
  label: Tag,
  reminder: Bell,
  attachment: Upload,
  subtask: ListTodo,
};

const actionColors: Record<string, string> = {
  created: 'bg-green-100 text-green-600 dark:bg-green-900/30',
  updated: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30',
  deleted: 'bg-red-100 text-red-600 dark:bg-red-900/30',
  completed: 'bg-green-100 text-green-600 dark:bg-green-900/30',
  uploaded: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30',
};

function ActivityItem({ activity, index }: { activity: Activity; index: number }) {
  const ActionIcon = actionIcons[activity.action] || Pencil;
  const EntityIcon = entityIcons[activity.entityType] || ListTodo;
  const colorClass = actionColors[activity.action] || actionColors.updated;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="flex items-start gap-3 py-3"
    >
      <div className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-full', colorClass)}>
        <ActionIcon className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm">
          <span className="font-medium">{activity.userName}</span>
          {' '}<span className="text-muted-foreground">{activity.action}</span>{' '}
          <span className="font-medium">{activity.entityTitle}</span>
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {new Date(activity.createdAt).toLocaleString()}
        </p>
      </div>
      <EntityIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
    </motion.div>
  );
}

interface ActivityFeedProps {
  limit?: number;
  className?: string;
}

export function ActivityFeed({ limit, className }: ActivityFeedProps) {
  const { data: activities, isLoading } = useActivity();

  const displayActivities = limit ? activities?.slice(0, limit) : activities;

  if (isLoading) {
    return (
      <div className={cn('space-y-3', className)}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-12" />
        ))}
      </div>
    );
  }

  if (!displayActivities || displayActivities.length === 0) {
    return (
      <EmptyState
        icon={ListTodo}
        title="No activity yet"
        description="Your recent actions will appear here."
      />
    );
  }

  return (
    <div className={cn('divide-y divide-border', className)}>
      {displayActivities.map((activity, i) => (
        <ActivityItem key={activity.id} activity={activity} index={i} />
      ))}
    </div>
  );
}
