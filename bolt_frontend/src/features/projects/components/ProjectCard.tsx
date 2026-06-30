import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FolderKanban, ListTodo, Users } from 'lucide-react';
import { cn } from '../../../utils/cn';
import { ProgressBar } from '../../../components/ui/ProgressBar';
import { Badge } from '../../../components/ui/Badge';
import type { Project } from '../../../types';

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const taskCount = project.taskCount || 0;
  const completedCount = project.completedTaskCount || 0;
  const progress = taskCount > 0 ? (completedCount / taskCount) * 100 : 0;

  const statusColors: Record<string, string> = {
    'Not Started': 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
    Active: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
    Completed: 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400',
    'On Hold': 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'group rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/20 hover:shadow-md',
        className
      )}
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-lg"
            style={{ backgroundColor: `${project.color}20` }}
          >
            <FolderKanban className="h-5 w-5" style={{ color: project.color }} />
          </div>
          <div>
            <Link
              to={`/projects/${project.id}`}
              className="font-semibold hover:text-primary"
            >
              {project.name}
            </Link>
            {project.description && (
              <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                {project.description}
              </p>
            )}
          </div>
        </div>
        <Badge variant="secondary" className={statusColors[project.status]}>
          {project.status}
        </Badge>
      </div>

      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium">{Math.round(progress)}%</span>
        </div>
        <ProgressBar value={progress} barClassName="transition-all" />
      </div>

      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <ListTodo className="h-4 w-4" />
          {taskCount} tasks
        </span>
        <span className="flex items-center gap-1.5">
          <Users className="h-4 w-4" />
          1 member
        </span>
      </div>

      {project.startDate && project.dueDate && (
        <div className="mt-3 text-xs text-muted-foreground">
          {new Date(project.startDate).toLocaleDateString()} - {new Date(project.dueDate).toLocaleDateString()}
        </div>
      )}
    </motion.div>
  );
}
