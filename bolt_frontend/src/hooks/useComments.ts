import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { commentService } from '../api/services';
import { handleApiError } from '../api/client';
import type { Comment } from '../types';
import toast from 'react-hot-toast';

export function useComments(taskId: string) {
  return useQuery({
    queryKey: ['comments', taskId],
    queryFn: async () => {
      try {
        const response = await commentService.getByTask(taskId);
        return response.data as Comment[];
      } catch (error) {
        throw new Error(handleApiError(error));
      }
    },
    enabled: !!taskId,
  });
}

export function useCreateComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ taskId, content }: { taskId: string; content: string }) => {
      const response = await commentService.create(taskId, content);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['comments', variables.taskId] });
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Comment added');
    },
    onError: (error) => {
      toast.error(handleApiError(error));
    },
  });
}

export function useDeleteComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ taskId, commentId }: { taskId: string; commentId: string }) => {
      await commentService.delete(taskId, commentId);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['comments', variables.taskId] });
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Comment deleted');
    },
    onError: (error) => {
      toast.error(handleApiError(error));
    },
  });
}
