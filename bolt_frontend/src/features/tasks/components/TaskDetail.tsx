import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Calendar, Clock, Tag, Paperclip, CheckCircle2, Circle,
  Plus, Trash2, Pencil, Send, FileText, Eye, EyeOff
} from 'lucide-react';
import { useTask, useUpdateTask, useDeleteTask } from '../../../hooks/useTasks';
import { useComments, useCreateComment, useDeleteComment } from '../../../hooks/useComments';
import { useUploadAttachment, useDeleteAttachment } from '../../../hooks/useAttachments';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Textarea } from '../../../components/ui/Textarea';
import { StatusBadge, PriorityBadge } from '../../../components/ui/StatusBadge';
import { ProgressBar } from '../../../components/ui/ProgressBar';
import { FileUpload } from '../../../components/ui/FileUpload';
import { Skeleton } from '../../../components/ui/Skeleton';
import { EmptyState } from '../../../components/ui/EmptyState';
import { ConfirmationDialog } from '../../../components/ui/ConfirmationDialog';
import { Avatar } from '../../../components/ui/Avatar';
import { cn } from '../../../utils/cn';
import type { Subtask, Reminder } from '../../../types';

export function TaskDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: task, isLoading } = useTask(id || '');
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();
  const { data: comments } = useComments(id || '');
  const createComment = useCreateComment();
  const deleteComment = useDeleteComment();
  const uploadAttachment = useUploadAttachment();
  const deleteAttachment = useDeleteAttachment();

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [newSubtask, setNewSubtask] = useState('');
  const [newReminder, setNewReminder] = useState({ message: '', remindAt: '' });
  const [newComment, setNewComment] = useState('');

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-32" />
        <Skeleton className="h-48" />
      </div>
    );
  }

  if (!task) {
    return (
      <EmptyState
        icon={Circle}
        title="Task not found"
        description="The task you're looking for doesn't exist or has been deleted."
        actionLabel="Go back"
        onAction={() => navigate('/tasks')}
      />
    );
  }

  const completedSubtasks = task.subtasks?.filter(s => s.completed).length || 0;
  const totalSubtasks = task.subtasks?.length || 0;
  const progress = totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;

  const handleToggleSubtask = (subtaskId: string, completed: boolean) => {
    updateTask.mutate({
      id: task.id,
      data: {
        subtasks: task.subtasks?.map(s =>
          s.id === subtaskId ? { ...s, completed } : s
        ),
      },
    });
  };

  const handleAddSubtask = () => {
    if (!newSubtask.trim()) return;
    const subtask: Subtask = {
      id: Date.now().toString(),
      title: newSubtask,
      completed: false,
      taskId: task.id,
    };
    updateTask.mutate({
      id: task.id,
      data: {
        subtasks: [...(task.subtasks || []), subtask],
      },
    });
    setNewSubtask('');
  };

  const handleDeleteSubtask = (subtaskId: string) => {
    updateTask.mutate({
      id: task.id,
      data: {
        subtasks: task.subtasks?.filter(s => s.id !== subtaskId),
      },
    });
  };

  const handleAddReminder = () => {
    if (!newReminder.message.trim() || !newReminder.remindAt) return;
    const reminder: Reminder = {
      id: Date.now().toString(),
      message: newReminder.message,
      remindAt: newReminder.remindAt,
      sent: false,
      taskId: task.id,
    };
    updateTask.mutate({
      id: task.id,
      data: {
        reminders: [...(task.reminders || []), reminder],
      },
    });
    setNewReminder({ message: '', remindAt: '' });
  };

  const handleDeleteReminder = (reminderId: string) => {
    updateTask.mutate({
      id: task.id,
      data: {
        reminders: task.reminders?.filter(r => r.id !== reminderId),
      },
    });
  };

  const handleToggleComplete = () => {
    updateTask.mutate({
      id: task.id,
      data: {
        status: task.status === 'Completed' ? 'Pending' : 'Completed',
        completedAt: task.status === 'Completed' ? undefined : new Date().toISOString(),
      },
    });
  };

  const handleTogglePublish = () => {
    updateTask.mutate({
      id: task.id,
      data: { published: !task.published },
    });
  };

  const handleDelete = async () => {
    await deleteTask.mutateAsync(task.id);
    navigate('/tasks');
  };

  const handleAddComment = () => {
    if (!newComment.trim() || !id) return;
    createComment.mutate({ taskId: id, content: newComment });
    setNewComment('');
  };

  const handleUploadFile = (file: File) => {
    if (!id) return;
    uploadAttachment.mutate({ taskId: id, file });
  };

  const handleDeleteAttachment = (attachmentId: string) => {
    deleteAttachment.mutate(attachmentId);
  };

  const isImage = (type: string) => type.startsWith('image/');

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/tasks">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className={cn(
                'text-2xl font-bold',
                task.status === 'Completed' && 'text-muted-foreground line-through'
              )}>
                {task.title}
              </h1>
              {!task.published && (
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                  Draft
                </span>
              )}
            </div>
            <div className="mt-1 flex items-center gap-2">
              <StatusBadge status={task.status} />
              <PriorityBadge priority={task.priority} />
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleTogglePublish}>
            {task.published ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
            {task.published ? 'Unpublish' : 'Publish'}
          </Button>
          <Button variant="outline" onClick={() => {}}>
            <Pencil className="mr-2 h-4 w-4" /> Edit
          </Button>
          <Button variant="destructive" onClick={() => setShowDeleteDialog(true)}>
            <Trash2 className="mr-2 h-4 w-4" /> Delete
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          {task.description && (
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="mb-3 font-semibold">Description</h3>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{task.description}</p>
            </div>
          )}

          {/* Subtasks */}
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Subtasks</h3>
                <p className="text-xs text-muted-foreground">{completedSubtasks} of {totalSubtasks} completed</p>
              </div>
              {totalSubtasks > 0 && (
                <span className="text-sm font-medium">{Math.round(progress)}%</span>
              )}
            </div>
            {totalSubtasks > 0 && <ProgressBar value={progress} className="mb-4" />}
            <div className="space-y-2">
              {task.subtasks?.map(subtask => (
                <div key={subtask.id} className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleSubtask(subtask.id, !subtask.completed)}
                    className={cn(
                      'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                      subtask.completed
                        ? 'border-green-500 bg-green-500 text-white'
                        : 'border-muted-foreground/30 hover:border-primary'
                    )}
                  >
                    {subtask.completed && <CheckCircle2 className="h-3.5 w-3.5" />}
                  </button>
                  <span className={cn(
                    'flex-1 text-sm',
                    subtask.completed && 'text-muted-foreground line-through'
                  )}>
                    {subtask.title}
                  </span>
                  <button
                    onClick={() => handleDeleteSubtask(subtask.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <Input
                placeholder="Add a subtask..."
                value={newSubtask}
                onChange={(e) => setNewSubtask(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddSubtask()}
                className="flex-1"
              />
              <Button onClick={handleAddSubtask} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Attachments */}
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="mb-3 font-semibold">Attachments</h3>
            {task.attachments && task.attachments.length > 0 ? (
              <div className="space-y-3">
                {task.attachments.map(attachment => (
                  <div key={attachment.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
                    {isImage(attachment.type) ? (
                      <img src={attachment.url} alt={attachment.name} className="h-12 w-12 rounded object-cover" />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded bg-muted">
                        <FileText className="h-6 w-6 text-muted-foreground" />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{attachment.name}</p>
                      <p className="text-xs text-muted-foreground">{(attachment.size / 1024).toFixed(1)} KB</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteAttachment(attachment.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">No attachments yet</div>
            )}
            <div className="mt-4">
              <FileUpload
                onUpload={handleUploadFile}
                onRemove={() => {}}
              />
            </div>
          </div>

          {/* Comments */}
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="mb-4 font-semibold">Comments</h3>
            <div className="space-y-4">
              {(comments || task.comments)?.map(comment => (
                <div key={comment.id} className="flex gap-3">
                  <Avatar size="sm" fallback={comment.author.username} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{comment.author.username}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-foreground">{comment.content}</p>
                  </div>
                  <button
                    onClick={() => id && deleteComment.mutate({ taskId: id, commentId: comment.id })}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <Textarea
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleAddComment()}
                className="flex-1"
                rows={2}
              />
              <Button onClick={handleAddComment} size="sm" className="self-end">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Details */}
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="mb-4 font-semibold">Details</h3>
            <div className="space-y-3 text-sm">
              {task.dueDate && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Due {new Date(task.dueDate).toLocaleDateString()}
                </div>
              )}
              {task.estimatedTime && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {task.estimatedTime} hours estimated
                </div>
              )}
              {task.project && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Tag className="h-4 w-4" />
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: task.project.color }}
                  />
                  {task.project.name}
                </div>
              )}
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                Created {new Date(task.createdAt).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                {task.published ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                {task.published ? 'Published' : 'Draft'}
              </div>
            </div>
          </div>

          {/* Labels */}
          {task.labels && task.labels.length > 0 && (
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="mb-3 font-semibold">Labels</h3>
              <div className="flex flex-wrap gap-2">
                {task.labels.map(label => (
                  <span
                    key={label.id}
                    className="rounded-full px-2.5 py-1 text-xs font-medium"
                    style={{ backgroundColor: `${label.color}20`, color: label.color }}
                  >
                    {label.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Reminders */}
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="mb-3 font-semibold">Reminders</h3>
            <div className="space-y-2">
              {task.reminders?.map(reminder => (
                <div key={reminder.id} className="flex items-center justify-between rounded-lg bg-muted p-3">
                  <div>
                    <p className="text-sm font-medium">{reminder.message}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(reminder.remindAt).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteReminder(reminder.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-2">
              <Input
                placeholder="Reminder message..."
                value={newReminder.message}
                onChange={(e) => setNewReminder(prev => ({ ...prev, message: e.target.value }))}
              />
              <div className="flex gap-2">
                <Input
                  type="datetime-local"
                  value={newReminder.remindAt}
                  onChange={(e) => setNewReminder(prev => ({ ...prev, remindAt: e.target.value }))}
                  className="flex-1"
                />
                <Button onClick={handleAddReminder} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="mb-3 font-semibold">Quick Actions</h3>
            <div className="space-y-2">
              <Button
                variant={task.status === 'Completed' ? 'outline' : 'default'}
                className="w-full"
                onClick={handleToggleComplete}
              >
                <CheckCircle2 className="mr-2 h-4 w-4" />
                {task.status === 'Completed' ? 'Mark as Pending' : 'Mark as Complete'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Dialog */}
      <ConfirmationDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        title="Delete Task"
        description="Are you sure you want to delete this task? This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleDelete}
        variant="destructive"
      />
    </motion.div>
  );
}
