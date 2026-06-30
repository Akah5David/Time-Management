import { useState } from 'react';
import { motion } from 'framer-motion';
import { Paperclip, Trash2, FileText, Image as ImageIcon, Download } from 'lucide-react';
import { useAttachments, useDeleteAttachment } from '../../hooks/useAttachments';
import { Button } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/EmptyState';
import { Skeleton } from '../../components/ui/Skeleton';
import { ConfirmationDialog } from '../../components/ui/ConfirmationDialog';
import { cn } from '../../utils/cn';
import type { Attachment } from '../../types';

export function AttachmentsPage() {
  const { data: attachments, isLoading } = useAttachments();
  const deleteAttachment = useDeleteAttachment();

  const [deleteAttachmentId, setDeleteAttachmentId] = useState<string | null>(null);
  const [previewAttachment, setPreviewAttachment] = useState<Attachment | null>(null);

  const handleDelete = async () => {
    if (!deleteAttachmentId) return;
    await deleteAttachment.mutateAsync(deleteAttachmentId);
    setDeleteAttachmentId(null);
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return ImageIcon;
    return FileText;
  };

  const getFileColor = (type: string) => {
    if (type.startsWith('image/')) return 'bg-purple-100 text-purple-600 dark:bg-purple-900/30';
    if (type.includes('pdf')) return 'bg-red-100 text-red-600 dark:bg-red-900/30';
    if (type.includes('doc')) return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30';
    return 'bg-gray-100 text-gray-600 dark:bg-gray-800';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Attachments</h1>
        <p className="text-sm text-muted-foreground">Manage all your uploaded files</p>
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      ) : attachments && attachments.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {attachments.map((attachment, i) => {
            const Icon = getFileIcon(attachment.type);
            const colorClass = getFileColor(attachment.type);
            const isImage = attachment.type.startsWith('image/');

            return (
              <motion.div
                key={attachment.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/20 hover:shadow-md"
              >
                {isImage ? (
                  <div
                    className="h-32 w-full cursor-pointer bg-cover bg-center"
                    style={{ backgroundImage: `url(${attachment.url})` }}
                    onClick={() => setPreviewAttachment(attachment)}
                  />
                ) : (
                  <div className={cn('flex h-32 items-center justify-center', colorClass)}>
                    <Icon className="h-12 w-12" />
                  </div>
                )}
                <div className="p-4">
                  <p className="truncate text-sm font-medium">{attachment.name}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{(attachment.size / 1024).toFixed(1)} KB</span>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7" asChild>
                        <a href={attachment.url} download={attachment.name}>
                          <Download className="h-3.5 w-3.5" />
                        </a>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => setDeleteAttachmentId(attachment.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon={Paperclip}
          title="No attachments yet"
          description="Upload files to your tasks to see them here."
        />
      )}

      {/* Image Preview Modal */}
      {previewAttachment && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setPreviewAttachment(null)}
        >
          <img
            src={previewAttachment.url}
            alt={previewAttachment.name}
            className="max-h-[80vh] max-w-full rounded-lg object-contain"
          />
        </div>
      )}

      <ConfirmationDialog
        open={!!deleteAttachmentId}
        onOpenChange={() => setDeleteAttachmentId(null)}
        title="Delete Attachment"
        description="Are you sure you want to delete this file?"
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleDelete}
        variant="destructive"
      />
    </div>
  );
}
