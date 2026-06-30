import { useMutation, useQueryClient } from '@tanstack/react-query';
import { subtaskService } from '../api/services';
import { handleApiError } from '../api/client';
import type { Subtask } from '../types';
import toast from 'react-hot-toast';

export function useCreateSubtask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<Subtask>) => {
      const response = await subtaskService.create(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Subtask created');
    },
    onError: (error) => {
      toast.error(handleApiError(error));
    },
  });
}

export function useUpdateSubtask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Subtask> }) => {
      const response = await subtaskService.update(id, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error) => {
      toast.error(handleApiError(error));
    },
  });
}

export function useDeleteSubtask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await subtaskService.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Subtask deleted');
    },
    onError: (error) => {
      toast.error(handleApiError(error));
    },
  });
}
