import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckSquare, Plus, Trash2, CheckCircle2, Circle } from 'lucide-react';
import { useTasks } from '../../hooks/useTasks';
import { useCreateSubtask, useUpdateSubtask, useDeleteSubtask } from '../../hooks/useSubtasks';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { EmptyState } from '../../components/ui/EmptyState';
import { Skeleton } from '../../components/ui/Skeleton';
import { ConfirmationDialog } from '../../components/ui/ConfirmationDialog';
import { cn } from '../../utils/cn';
import type { Subtask } from '../../types';

export function SubtasksPage() {
  const { data: tasksData } = useTasks();
  const tasks = tasksData?.data || [];
  const createSubtask = useCreateSubtask();
  const updateSubtask = useUpdateSubtask();
  const deleteSubtask = useDeleteSubtask();

  const [selectedTaskId, setSelectedTaskId] = useState('');
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');
  const [deleteSubtaskId, setDeleteSubtaskId] = useState<string | null>(null);

  const selectedTask = tasks.find(t => t.id === selectedTaskId);
  const allSubtasks = tasks.flatMap(t => t.subtasks?.map(s => ({ ...s, taskTitle: t.title, taskId: t.id })) || []);

  const handleCreate = async () => {
    if (!newSubtaskTitle.trim() || !selectedTaskId) return;
    await createSubtask.mutateAsync({ title: newSubtaskTitle, taskId: selectedTaskId });
    setNewSubtaskTitle('');
  };

  const handleToggle = (subtask: Subtask) => {
    updateSubtask.mutate({ id: subtask.id, data: { completed: !subtask.completed } });
  };

  const handleDelete = async () => {
    if (!deleteSubtaskId) return;
    await deleteSubtask.mutateAsync(deleteSubtaskId);
    setDeleteSubtaskId(null);
  };

  const taskOptions = [
    { value: '', label: 'Select a task' },
    ...tasks.map(t => ({ value: t.id, label: t.title })),
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Subtasks</h1>
          <p className="text-sm text-muted-foreground">Break down your tasks into smaller steps</p>
        </div>
      </div>

      {/* Create Subtask */}
      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="mb-4 font-semibold">Create New Subtask</h3>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex-1">
            <Select
              label="Task"
              options={taskOptions}
              value={selectedTaskId}
              onChange={(e) => setSelectedTaskId(e.target.value)}
            />
          </div>
          <div className="flex-[2]">
            <Input
              placeholder="Subtask title..."
              value={newSubtaskTitle}
              onChange={(e) => setNewSubtaskTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
            />
          </div>
          <Button onClick={handleCreate} isLoading={createSubtask.isPending}>
            <Plus className="mr-2 h-4 w-4" /> Add
          </Button>
        </div>
      </div>

      {/* Subtasks List */}
      {allSubtasks.length > 0 ? (
        <div className="space-y-3">
          {allSubtasks.map((subtask, i) => (
            <motion.div
              key={subtask.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/20"
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleToggle(subtask)}
                  className={cn(
                    'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                    subtask.completed
                      ? 'border-green-500 bg-green-500 text-white'
                      : 'border-muted-foreground/30 hover:border-primary'
                  )}
                >
                  {subtask.completed && <CheckCircle2 className="h-3.5 w-3.5" />}
                </button>
                <div>
                  <p className={cn('text-sm font-medium', subtask.completed && 'text-muted-foreground line-through')}>
                    {subtask.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{subtask.taskTitle}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDeleteSubtaskId(subtask.id)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </motion.div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={CheckSquare}
          title="No subtasks yet"
          description="Select a task and add subtasks to break it down."
        />
      )}

      <ConfirmationDialog
        open={!!deleteSubtaskId}
        onOpenChange={() => setDeleteSubtaskId(null)}
        title="Delete Subtask"
        description="Are you sure you want to delete this subtask?"
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleDelete}
        variant="destructive"
      />
    </div>
  );
}
