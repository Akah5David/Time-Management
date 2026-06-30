import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, FolderKanban, Pencil, Trash2, ListTodo, CheckCircle2, Clock } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Skeleton } from '../../components/ui/Skeleton';
import { EmptyState } from '../../components/ui/EmptyState';
import { TaskCard } from '../../features/tasks/components/TaskCard';
import { EditProjectModal, DeleteProjectDialog } from '../../features/projects/components';
import { useProject } from '../../hooks/useProjects';
import { useUpdateTask } from '../../hooks/useTasks';
import { useState } from 'react';
import type { Project } from '../../types';

export function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: project, isLoading } = useProject(id || '');
  const updateTask = useUpdateTask();
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [deleteProjectId, setDeleteProjectId] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-32" />
        <Skeleton className="h-48" />
      </div>
    );
  }

  if (!project) {
    return (
      <EmptyState
        icon={FolderKanban}
        title="Project not found"
        description="The project you're looking for doesn't exist or has been deleted."
        actionLabel="Back to projects"
        onAction={() => window.history.back()}
      />
    );
  }

  const tasks = project.tasks || [];
  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  const progress = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;

  const handleToggleComplete = (taskId: string, completed: boolean) => {
    updateTask.mutate({
      id: taskId,
      data: {
        status: completed ? 'Completed' : 'Pending',
        completedAt: completed ? new Date().toISOString() : undefined,
      },
    });
  };

  const statusColors: Record<string, string> = {
    'Not Started': 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
    Active: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
    Completed: 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400',
    'On Hold': 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/projects">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-lg"
              style={{ backgroundColor: `${project.color}20` }}
            >
              <FolderKanban className="h-5 w-5" style={{ color: project.color }} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{project.name}</h1>
              <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[project.status]}`}>
                {project.status}
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setEditProject(project)}>
            <Pencil className="mr-2 h-4 w-4" /> Edit
          </Button>
          <Button variant="destructive" onClick={() => setDeleteProjectId(project.id)}>
            <Trash2 className="mr-2 h-4 w-4" /> Delete
          </Button>
        </div>
      </div>

      {/* Overview */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 text-muted-foreground">
            <ListTodo className="h-4 w-4" />
            <span className="text-sm">Total Tasks</span>
          </div>
          <p className="mt-2 text-2xl font-bold">{tasks.length}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 text-muted-foreground">
            <CheckCircle2 className="h-4 w-4" />
            <span className="text-sm">Completed</span>
          </div>
          <p className="mt-2 text-2xl font-bold">{completedTasks}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span className="text-sm">Progress</span>
          </div>
          <p className="mt-2 text-2xl font-bold">{Math.round(progress)}%</p>
        </div>
      </div>

      {/* Progress */}
      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="mb-4 font-semibold">Progress</h3>
        <ProgressBar value={progress} showLabel size="lg" />
      </div>

      {/* Description */}
      {project.description && (
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="mb-3 font-semibold">Description</h3>
          <p className="text-sm text-muted-foreground whitespace-pre-wrap">{project.description}</p>
        </div>
      )}

      {/* Tasks */}
      <div className="space-y-4">
        <h3 className="font-semibold">Tasks</h3>
        {tasks.length === 0 ? (
          <EmptyState
            icon={ListTodo}
            title="No tasks yet"
            description="Add tasks to this project to track progress."
          />
        ) : (
          <div className="space-y-3">
            {tasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleComplete={handleToggleComplete}
              />
            ))}
          </div>
        )}
      </div>

      <EditProjectModal project={editProject} open={!!editProject} onOpenChange={() => setEditProject(null)} />
      <DeleteProjectDialog projectId={deleteProjectId} open={!!deleteProjectId} onOpenChange={() => setDeleteProjectId(null)} />
    </motion.div>
  );
}
