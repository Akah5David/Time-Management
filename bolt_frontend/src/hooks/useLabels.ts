import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { labelService } from '../api/services';
import { handleApiError } from '../api/client';
import type { Label } from '../types';
import toast from 'react-hot-toast';

const LABELS_KEY = 'labels';

export function useLabels() {
  return useQuery({
    queryKey: [LABELS_KEY],
    queryFn: async () => {
      try {
        const response = await labelService.getAll();
        return response.data;
      } catch (error) {
        throw new Error(handleApiError(error));
      }
    },
  });
}

export function useCreateLabel() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<Label>) => {
      const response = await labelService.create(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LABELS_KEY] });
      toast.success('Label created successfully');
    },
    onError: (error) => {
      toast.error(handleApiError(error));
    },
  });
}

export function useUpdateLabel() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Label> }) => {
      const response = await labelService.update(id, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LABELS_KEY] });
      toast.success('Label updated successfully');
    },
    onError: (error) => {
      toast.error(handleApiError(error));
    },
  });
}

export function useDeleteLabel() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await labelService.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LABELS_KEY] });
      toast.success('Label deleted successfully');
    },
    onError: (error) => {
      toast.error(handleApiError(error));
    },
  });
}
