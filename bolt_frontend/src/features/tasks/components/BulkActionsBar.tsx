import { CheckCircle2, Archive, Trash2, Tag } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { useBulkUpdateTasks, useBulkDeleteTasks } from '../../../hooks/useTasks';
import type { Task } from '../../../types';

interface BulkActionsBarProps {
  selectedIds: string[];
  onClear: () => void;
}

export function BulkActionsBar({ selectedIds, onClear }: BulkActionsBarProps) {
  const bulkUpdate = useBulkUpdateTasks();
  const bulkDelete = useBulkDeleteTasks();

  if (selectedIds.length === 0) return null;

  const handleComplete = () => {
    bulkUpdate.mutate({ ids: selectedIds, data: { status: 'Completed' } });
    onClear();
  };

  const handleArchive = () => {
    bulkUpdate.mutate({ ids: selectedIds, data: { status: 'Archived' } });
    onClear();
  };

  const handleDelete = () => {
    bulkDelete.mutate(selectedIds);
    onClear();
  };

  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3">
      <span className="text-sm font-medium">{selectedIds.length} selected</span>
      <div className="ml-auto flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={handleComplete}>
          <CheckCircle2 className="mr-2 h-4 w-4" /> Complete
        </Button>
        <Button variant="outline" size="sm" onClick={handleArchive}>
          <Archive className="mr-2 h-4 w-4" /> Archive
        </Button>
        <Button variant="destructive" size="sm" onClick={handleDelete}>
          <Trash2 className="mr-2 h-4 w-4" /> Delete
        </Button>
        <Button variant="ghost" size="sm" onClick={onClear}>
          Clear
        </Button>
      </div>
    </div>
  );
}
