import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Plus, Trash2, Clock, CheckCircle2 } from 'lucide-react';
import { useReminders, useCreateReminder, useDeleteReminder } from '../../hooks/useReminders';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { EmptyState } from '../../components/ui/EmptyState';
import { Skeleton } from '../../components/ui/Skeleton';
import { ConfirmationDialog } from '../../components/ui/ConfirmationDialog';
import type { Reminder } from '../../types';

export function RemindersPage() {
  const { data: reminders, isLoading } = useReminders();
  const createReminder = useCreateReminder();
  const deleteReminder = useDeleteReminder();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [deleteReminderId, setDeleteReminderId] = useState<string | null>(null);
  const [newReminder, setNewReminder] = useState({ message: '', remindAt: '', taskId: '' });

  const handleCreate = async () => {
    if (!newReminder.message.trim() || !newReminder.remindAt) return;
    await createReminder.mutateAsync({
      message: newReminder.message,
      remindAt: newReminder.remindAt,
      taskId: newReminder.taskId || 't1',
    });
    setNewReminder({ message: '', remindAt: '', taskId: '' });
    setCreateModalOpen(false);
  };

  const handleDelete = async () => {
    if (!deleteReminderId) return;
    await deleteReminder.mutateAsync(deleteReminderId);
    setDeleteReminderId(null);
  };

  const getTimeRemaining = (remindAt: string) => {
    const diff = new Date(remindAt).getTime() - Date.now();
    if (diff < 0) return 'Overdue';
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(hours / 24);
    if (days > 0) return `${days}d ${hours % 24}h remaining`;
    return `${hours}h remaining`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Reminders</h1>
          <p className="text-sm text-muted-foreground">Manage your task reminders</p>
        </div>
        <Button onClick={() => setCreateModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> New Reminder
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-20" />
          ))}
        </div>
      ) : reminders && reminders.length > 0 ? (
        <div className="space-y-3">
          {reminders.map((reminder, i) => (
            <motion.div
              key={reminder.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/20"
            >
              <div className="flex items-center gap-4">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                  new Date(reminder.remindAt) < new Date()
                    ? 'bg-red-100 text-red-600 dark:bg-red-900/30'
                    : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30'
                }`}>
                  <Bell className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">{reminder.message}</p>
                  <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(reminder.remindAt).toLocaleString()}
                    </span>
                    <span className={`font-medium ${
                      new Date(reminder.remindAt) < new Date() ? 'text-red-500' : 'text-blue-500'
                    }`}>
                      {getTimeRemaining(reminder.remindAt)}
                    </span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDeleteReminderId(reminder.id)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </motion.div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Bell}
          title="No reminders yet"
          description="Create reminders to stay on top of your tasks."
          actionLabel="Create Reminder"
          onAction={() => setCreateModalOpen(true)}
        />
      )}

      {/* Create Modal */}
      <Modal open={createModalOpen} onOpenChange={setCreateModalOpen} title="Create Reminder" description="Set a reminder for a task">
        <div className="space-y-4">
          <Input
            label="Message"
            placeholder="e.g. Review the proposal before the meeting"
            value={newReminder.message}
            onChange={(e) => setNewReminder(prev => ({ ...prev, message: e.target.value }))}
          />
          <Input
            label="Remind At"
            type="datetime-local"
            value={newReminder.remindAt}
            onChange={(e) => setNewReminder(prev => ({ ...prev, remindAt: e.target.value }))}
          />
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setCreateModalOpen(false)}>Cancel</Button>
            <Button onClick={handleCreate} isLoading={createReminder.isPending}>Create</Button>
          </div>
        </div>
      </Modal>

      <ConfirmationDialog
        open={!!deleteReminderId}
        onOpenChange={() => setDeleteReminderId(null)}
        title="Delete Reminder"
        description="Are you sure you want to delete this reminder?"
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleDelete}
        variant="destructive"
      />
    </div>
  );
}
