import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Textarea } from '../../../components/ui/Textarea';
import { Select } from '../../../components/ui/Select';
import { DatePicker } from '../../../components/ui/DatePicker';
import { ColorPicker } from '../../../components/ui/ColorPicker';
import { useCreateProject } from '../../../hooks/useProjects';
import type { Project } from '../../../types';

const projectSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  color: z.string(),
  status: z.enum(['Not Started', 'Active', 'Completed', 'On Hold']),
  startDate: z.string().optional(),
  dueDate: z.string().optional(),
});

type ProjectForm = z.infer<typeof projectSchema>;

interface CreateProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateProjectModal({ open, onOpenChange }: CreateProjectModalProps) {
  const createProject = useCreateProject();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProjectForm>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      color: '#3b82f6',
      status: 'Not Started',
    },
  });

  const onSubmit = async (data: ProjectForm) => {
    await createProject.mutateAsync(data as Partial<Project>);
    reset();
    onOpenChange(false);
  };

  const statusOptions = [
    { value: 'Not Started', label: 'Not Started' },
    { value: 'Active', label: 'Active' },
    { value: 'Completed', label: 'Completed' },
    { value: 'On Hold', label: 'On Hold' },
  ];

  return (
    <Modal open={open} onOpenChange={onOpenChange} title="Create Project" description="Start a new project">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Project Name"
          placeholder="My Awesome Project"
          error={errors.name?.message}
          {...register('name')}
        />

        <Textarea
          label="Description"
          placeholder="Describe your project..."
          rows={3}
          {...register('description')}
        />

        <div className="flex items-end gap-4">
          <div className="flex-1">
            <Select
              label="Status"
              options={statusOptions}
              error={errors.status?.message}
              {...register('status')}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Color</label>
            <ColorPicker
              value={watch('color') || '#3b82f6'}
              onChange={(value) => setValue('color', value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <DatePicker
            label="Start Date"
            value={watch('startDate')}
            onChange={(value) => setValue('startDate', value)}
          />
          <DatePicker
            label="Due Date"
            value={watch('dueDate')}
            onChange={(value) => setValue('dueDate', value)}
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" isLoading={createProject.isPending}>
            Create Project
          </Button>
        </div>
      </form>
    </Modal>
  );
}
