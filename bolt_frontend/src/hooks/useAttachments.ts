import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { attachmentService } from '../api/services';
import { handleApiError } from '../api/client';
import type { Attachment } from '../types';
import toast from 'react-hot-toast';

const ATTACHMENTS_KEY = 'attachments';

export function useAttachments() {
  return useQuery({
    queryKey: [ATTACHMENTS_KEY],
    queryFn: async () => {
      try {
        const response = await attachmentService.getAll();
        return response.data as Attachment[];
      } catch (error) {
        throw new Error(handleApiError(error));
      }
    },
  });
}

export function useUploadAttachment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ taskId, file }: { taskId: string; file: File }) => {
      const response = await attachmentService.upload(taskId, file);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ATTACHMENTS_KEY] });
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('File uploaded');
    },
    onError: (error) => {
      toast.error(handleApiError(error));
    },
  });
}

export function useDeleteAttachment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await attachmentService.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ATTACHMENTS_KEY] });
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Attachment deleted');
    },
    onError: (error) => {
      toast.error(handleApiError(error));
    },
  });
}
