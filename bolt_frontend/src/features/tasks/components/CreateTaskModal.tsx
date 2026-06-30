import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Textarea } from '../../../components/ui/Textarea';
import { Select } from '../../../components/ui/Select';
import { DatePicker } from '../../../components/ui/DatePicker';
import { Switch } from '../../../components/ui/Switch';
import { useCreateTask } from '../../../hooks/useTasks';
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
  published: z.boolean(),
});

type TaskForm = z.infer<typeof taskSchema>;

interface CreateTaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateTaskModal({ open, onOpenChange }: CreateTaskModalProps) {
  const createTask = useCreateTask();
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
    defaultValues: {
      priority: 'Medium',
      status: 'Pending',
      published: true,
    },
  });

  const onSubmit = async (data: TaskForm) => {
    await createTask.mutateAsync({
      ...data,
      estimatedTime: data.estimatedTime ? parseInt(data.estimatedTime) : undefined,
    } as Partial<Task>);
    reset();
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
    <Modal open={open} onOpenChange={onOpenChange} title="Create Task" description="Add a new task to your workflow">
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

        <Switch
          label="Publish immediately"
          checked={watch('published')}
          onChange={(e) => setValue('published', e.target.checked)}
        />

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" isLoading={createTask.isPending}>
            Create Task
          </Button>
        </div>
      </form>
    </Modal>
  );
}
