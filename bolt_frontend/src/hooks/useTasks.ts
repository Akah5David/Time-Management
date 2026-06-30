import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { taskService } from '../api/services';
import { handleApiError } from '../api/client';
import type { Task, TaskFilters, TaskSort, PaginationParams } from '../types';
import toast from 'react-hot-toast';

const TASKS_KEY = 'tasks';

export function useTasks(
  filters?: TaskFilters,
  sort?: TaskSort,
  pagination?: PaginationParams
) {
  return useQuery({
    queryKey: [TASKS_KEY, filters, sort, pagination],
    queryFn: async () => {
      try {
        const params: Record<string, unknown> = {};
        if (filters) Object.assign(params, filters);
        if (sort) Object.assign(params, sort);
        if (pagination) Object.assign(params, pagination);
        const response = await taskService.getAll(params);
        return response.data;
      } catch (error) {
        throw new Error(handleApiError(error));
      }
    },
  });
}

export function useTask(id: string) {
  return useQuery({
    queryKey: [TASKS_KEY, id],
    queryFn: async () => {
      try {
        const response = await taskService.getById(id);
        return response.data;
      } catch (error) {
        throw new Error(handleApiError(error));
      }
    },
    enabled: !!id,
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<Task>) => {
      const response = await taskService.create(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TASKS_KEY] });
      toast.success('Task created successfully');
    },
    onError: (error) => {
      toast.error(handleApiError(error));
    },
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Task> }) => {
      const response = await taskService.update(id, data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [TASKS_KEY] });
      queryClient.invalidateQueries({ queryKey: [TASKS_KEY, variables.id] });
      toast.success('Task updated successfully');
    },
    onError: (error) => {
      toast.error(handleApiError(error));
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await taskService.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TASKS_KEY] });
      toast.success('Task deleted successfully');
    },
    onError: (error) => {
      toast.error(handleApiError(error));
    },
  });
}

export function useBulkUpdateTasks() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ ids, data }: { ids: string[]; data: Partial<Task> }) => {
      const response = await taskService.bulkUpdate(ids, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TASKS_KEY] });
      toast.success('Tasks updated successfully');
    },
    onError: (error) => {
      toast.error(handleApiError(error));
    },
  });
}

export function useBulkDeleteTasks() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (ids: string[]) => {
      await taskService.bulkDelete(ids);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TASKS_KEY] });
      toast.success('Tasks deleted successfully');
    },
    onError: (error) => {
      toast.error(handleApiError(error));
    },
  });
}
