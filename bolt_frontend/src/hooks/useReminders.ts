import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reminderService } from '../api/services';
import { handleApiError } from '../api/client';
import type { Reminder } from '../types';
import toast from 'react-hot-toast';

const REMINDERS_KEY = 'reminders';

export function useReminders() {
  return useQuery({
    queryKey: [REMINDERS_KEY],
    queryFn: async () => {
      try {
        const response = await reminderService.getAll();
        return response.data as Reminder[];
      } catch (error) {
        throw new Error(handleApiError(error));
      }
    },
  });
}

export function useCreateReminder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<Reminder>) => {
      const response = await reminderService.create(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [REMINDERS_KEY] });
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Reminder created');
    },
    onError: (error) => {
      toast.error(handleApiError(error));
    },
  });
}

export function useUpdateReminder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Reminder> }) => {
      const response = await reminderService.update(id, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [REMINDERS_KEY] });
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Reminder updated');
    },
    onError: (error) => {
      toast.error(handleApiError(error));
    },
  });
}

export function useDeleteReminder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await reminderService.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [REMINDERS_KEY] });
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Reminder deleted');
    },
    onError: (error) => {
      toast.error(handleApiError(error));
    },
  });
}
