import { ConfirmationDialog } from '../../../components/ui/ConfirmationDialog';
import { useDeleteTask } from '../../../hooks/useTasks';

interface DeleteTaskDialogProps {
  taskId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteTaskDialog({ taskId, open, onOpenChange }: DeleteTaskDialogProps) {
  const deleteTask = useDeleteTask();

  const handleConfirm = async () => {
    if (!taskId) return;
    await deleteTask.mutateAsync(taskId);
    onOpenChange(false);
  };

  return (
    <ConfirmationDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Delete Task"
      description="Are you sure you want to delete this task? This action cannot be undone."
      confirmLabel="Delete"
      cancelLabel="Cancel"
      onConfirm={handleConfirm}
      variant="destructive"
    />
  );
}
