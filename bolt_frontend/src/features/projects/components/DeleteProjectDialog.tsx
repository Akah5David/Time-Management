import { ConfirmationDialog } from '../../../components/ui/ConfirmationDialog';
import { useDeleteProject } from '../../../hooks/useProjects';

interface DeleteProjectDialogProps {
  projectId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteProjectDialog({ projectId, open, onOpenChange }: DeleteProjectDialogProps) {
  const deleteProject = useDeleteProject();

  const handleConfirm = async () => {
    if (!projectId) return;
    await deleteProject.mutateAsync(projectId);
    onOpenChange(false);
  };

  return (
    <ConfirmationDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Delete Project"
      description="Are you sure you want to delete this project? All associated tasks will also be deleted. This action cannot be undone."
      confirmLabel="Delete"
      cancelLabel="Cancel"
      onConfirm={handleConfirm}
      variant="destructive"
    />
  );
}
