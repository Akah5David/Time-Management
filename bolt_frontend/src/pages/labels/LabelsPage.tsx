import { useState } from 'react';
import { Plus, Tag, Pencil, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { EmptyState } from '../../components/ui/EmptyState';
import { Skeleton } from '../../components/ui/Skeleton';
import { ConfirmationDialog } from '../../components/ui/ConfirmationDialog';
import { ColorPicker } from '../../components/ui/ColorPicker';
import { useLabels, useCreateLabel, useUpdateLabel, useDeleteLabel } from '../../hooks/useLabels';
import { cn } from '../../utils/cn';
import type { Label } from '../../types';

export function LabelsPage() {
  const { data: labels, isLoading } = useLabels();
  const createLabel = useCreateLabel();
  const updateLabel = useUpdateLabel();
  const deleteLabel = useDeleteLabel();

  const [newLabelName, setNewLabelName] = useState('');
  const [newLabelColor, setNewLabelColor] = useState('#3b82f6');
  const [editingLabel, setEditingLabel] = useState<Label | null>(null);
  const [deleteLabelId, setDeleteLabelId] = useState<string | null>(null);

  const handleCreate = async () => {
    if (!newLabelName.trim()) return;
    await createLabel.mutateAsync({
      name: newLabelName,
      color: newLabelColor,
      userId: '1',
    });
    setNewLabelName('');
    setNewLabelColor('#3b82f6');
  };

  const handleUpdate = async () => {
    if (!editingLabel) return;
    await updateLabel.mutateAsync({
      id: editingLabel.id,
      data: { name: editingLabel.name, color: editingLabel.color },
    });
    setEditingLabel(null);
  };

  const handleDelete = async () => {
    if (!deleteLabelId) return;
    await deleteLabel.mutateAsync(deleteLabelId);
    setDeleteLabelId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Labels</h1>
          <p className="text-sm text-muted-foreground">Organize your tasks with labels</p>
        </div>
      </div>

      {/* Create Label */}
      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="mb-4 font-semibold">Create New Label</h3>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex-1">
            <Input
              placeholder="Label name"
              value={newLabelName}
              onChange={(e) => setNewLabelName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
            />
          </div>
          <ColorPicker value={newLabelColor} onChange={setNewLabelColor} />
          <Button onClick={handleCreate} isLoading={createLabel.isPending}>
            <Plus className="mr-2 h-4 w-4" /> Create
          </Button>
        </div>
      </div>

      {/* Labels List */}
      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-14" />
          ))}
        </div>
      ) : labels && labels.length > 0 ? (
        <div className="space-y-3">
          {labels.map((label, i) => (
            <motion.div
              key={label.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/20"
            >
              {editingLabel?.id === label.id ? (
                <div className="flex flex-1 items-center gap-3">
                  <ColorPicker
                    value={editingLabel.color}
                    onChange={(color) => setEditingLabel({ ...editingLabel, color })}
                  />
                  <Input
                    value={editingLabel.name}
                    onChange={(e) => setEditingLabel({ ...editingLabel, name: e.target.value })}
                    className="flex-1"
                    onKeyDown={(e) => e.key === 'Enter' && handleUpdate()}
                  />
                  <Button size="sm" onClick={handleUpdate} isLoading={updateLabel.isPending}>
                    Save
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setEditingLabel(null)}>
                    Cancel
                  </Button>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-white"
                      style={{ backgroundColor: label.color }}
                    >
                      {label.name.charAt(0).toUpperCase()}
                    </span>
                    <span
                      className="rounded-full px-3 py-1 text-sm font-medium"
                      style={{ backgroundColor: `${label.color}20`, color: label.color }}
                    >
                      {label.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setEditingLabel(label)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteLabelId(label.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Tag}
          title="No labels yet"
          description="Create labels to categorize your tasks."
          actionLabel="Create Label"
          onAction={() => document.querySelector('input')?.focus()}
        />
      )}

      <ConfirmationDialog
        open={!!deleteLabelId}
        onOpenChange={() => setDeleteLabelId(null)}
        title="Delete Label"
        description="Are you sure you want to delete this label? It will be removed from all tasks."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleDelete}
        variant="destructive"
      />
    </div>
  );
}
