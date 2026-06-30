import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, LayoutGrid, List, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/EmptyState';
import { Pagination } from '../../components/ui/Pagination';
import { Skeleton } from '../../components/ui/Skeleton';
import {
  TaskCard, TaskFilters, TaskKanban, TaskCalendar, TaskTimeline,
  TaskTable, CreateTaskModal, EditTaskModal, DeleteTaskDialog, BulkActionsBar,
} from '../../features/tasks/components';
import { useTasks, useUpdateTask } from '../../hooks/useTasks';
import type { Task, TaskFilters as TaskFiltersType, TaskSort } from '../../types';

type ViewMode = 'list' | 'kanban' | 'calendar' | 'timeline';

export function TasksPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [filters, setFilters] = useState<TaskFiltersType>({});
  const [sort, setSort] = useState<TaskSort>({ field: 'dueDate', direction: 'asc' });
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [deleteTaskId, setDeleteTaskId] = useState<string | null>(null);

  const { data, isLoading } = useTasks(filters, sort, { page, pageSize: 20 });
  const updateTask = useUpdateTask();

  const tasks = data?.data || [];
  const totalPages = data?.meta?.pagination?.pageCount || 1;

  const handleToggleComplete = (id: string, completed: boolean) => {
    updateTask.mutate({
      id,
      data: {
        status: completed ? 'Completed' : 'Pending',
        completedAt: completed ? new Date().toISOString() : undefined,
      },
    });
  };

  const handleSelect = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedIds(prev =>
      prev.length === tasks.length ? [] : tasks.map(t => t.id)
    );
  };

  const handleEdit = (task: Task) => {
    setEditTask(task);
  };

  const handleDelete = (task: Task) => {
    setDeleteTaskId(task.id);
  };

  const views = [
    { id: 'list' as ViewMode, icon: List, label: 'List' },
    { id: 'kanban' as ViewMode, icon: LayoutGrid, label: 'Kanban' },
    { id: 'calendar' as ViewMode, icon: CalendarIcon, label: 'Calendar' },
    { id: 'timeline' as ViewMode, icon: Clock, label: 'Timeline' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tasks</h1>
          <p className="text-sm text-muted-foreground">
            {data?.meta?.pagination?.total || 0} tasks total
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg border border-border p-1">
            {views.map(view => (
              <button
                key={view.id}
                onClick={() => setViewMode(view.id)}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm transition-colors ${
                  viewMode === view.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <view.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{view.label}</span>
              </button>
            ))}
          </div>
          <Button onClick={() => setCreateModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> New Task
          </Button>
        </div>
      </div>

      {/* Filters */}
      <TaskFilters
        filters={filters}
        onFiltersChange={setFilters}
        sort={sort}
        onSortChange={setSort}
      />

      {/* Bulk Actions */}
      <BulkActionsBar
        selectedIds={selectedIds}
        onClear={() => setSelectedIds([])}
      />

      {/* Content */}
      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-20" />
          ))}
        </div>
      ) : tasks.length === 0 ? (
        <EmptyState
          icon={Plus}
          title="No tasks found"
          description="Get started by creating your first task."
          actionLabel="Create Task"
          onAction={() => setCreateModalOpen(true)}
        />
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {viewMode === 'list' && (
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
            {viewMode === 'kanban' && (
              <TaskKanban
                tasks={tasks}
                onTaskClick={(task) => setEditTask(task)}
                onToggleComplete={handleToggleComplete}
              />
            )}
            {viewMode === 'calendar' && (
              <TaskCalendar
                tasks={tasks}
                onTaskClick={(task) => setEditTask(task)}
              />
            )}
            {viewMode === 'timeline' && (
              <TaskTimeline
                tasks={tasks}
                onTaskClick={(task) => setEditTask(task)}
              />
            )}
            {viewMode === 'list' && (
              <TaskTable
                tasks={tasks}
                selectedIds={selectedIds}
                onSelect={handleSelect}
                onSelectAll={handleSelectAll}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggleComplete={handleToggleComplete}
                sort={sort}
                onSortChange={setSort}
              />
            )}
          </motion.div>
        </AnimatePresence>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}

      {/* Modals */}
      <CreateTaskModal open={createModalOpen} onOpenChange={setCreateModalOpen} />
      <EditTaskModal task={editTask} open={!!editTask} onOpenChange={() => setEditTask(null)} />
      <DeleteTaskDialog taskId={deleteTaskId} open={!!deleteTaskId} onOpenChange={() => setDeleteTaskId(null)} />
    </div>
  );
}
