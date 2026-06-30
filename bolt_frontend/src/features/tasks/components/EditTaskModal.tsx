import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Textarea } from '../../../components/ui/Textarea';
import { Select } from '../../../components/ui/Select';
import { DatePicker } from '../../../components/ui/DatePicker';
import { useUpdateTask } from '../../../hooks/useTasks';
import { useProjects } from '../../../hooks/useProjects';
import type { Task } from '../../../types';

const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  priority: z.enum(['Low', 'Medium', 'High', 'Urgent']),
  status: z.enum(['Pending', 'In Progress', 'Completed', 'Cancelled', 'Archived']),
  dueDate: z.string().optional(),
  estimatedTime: z.string().optional(),
  projectId: z.string().optional(),
});

type TaskForm = z.infer<typeof taskSchema>;

interface EditTaskModalProps {
  task: Task | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditTaskModal({ task, open, onOpenChange }: EditTaskModalProps) {
  const updateTask = useUpdateTask();
  const { data: projects } = useProjects();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TaskForm>({
    resolver: zodResolver(taskSchema),
  });

  useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        description: task.description || '',
        priority: task.priority,
        status: task.status,
        dueDate: task.dueDate,
        estimatedTime: task.estimatedTime?.toString() || '',
        projectId: task.projectId || '',
      });
    }
  }, [task, reset]);

  const onSubmit = async (data: TaskForm) => {
    if (!task) return;
    await updateTask.mutateAsync({
      id: task.id,
      data: {
        ...data,
        estimatedTime: data.estimatedTime ? parseInt(data.estimatedTime) : undefined,
      },
    });
    onOpenChange(false);
  };

  const priorityOptions = [
    { value: 'Low', label: 'Low' },
    { value: 'Medium', label: 'Medium' },
    { value: 'High', label: 'High' },
    { value: 'Urgent', label: 'Urgent' },
  ];

  const statusOptions = [
    { value: 'Pending', label: 'Pending' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Completed', label: 'Completed' },
    { value: 'Cancelled', label: 'Cancelled' },
    { value: 'Archived', label: 'Archived' },
  ];

  const projectOptions = [
    { value: '', label: 'No Project' },
    ...(projects?.data?.map(p => ({ value: p.id, label: p.name })) || []),
  ];

  return (
    <Modal open={open} onOpenChange={onOpenChange} title="Edit Task" description="Update task details">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Title"
          placeholder="Task title"
          error={errors.title?.message}
          {...register('title')}
        />

        <Textarea
          label="Description"
          placeholder="Add a description..."
          rows={3}
          {...register('description')}
        />

        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Priority"
            options={priorityOptions}
            error={errors.priority?.message}
            {...register('priority')}
          />
          <Select
            label="Status"
            options={statusOptions}
            error={errors.status?.message}
            {...register('status')}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <DatePicker
            label="Due Date"
            value={watch('dueDate')}
            onChange={(value) => setValue('dueDate', value)}
          />
          <Input
            label="Estimated Time (hours)"
            type="number"
            placeholder="e.g. 4"
            {...register('estimatedTime')}
          />
        </div>

        <Select
          label="Project"
          options={projectOptions}
          {...register('projectId')}
        />

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" isLoading={updateTask.isPending}>
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
}
