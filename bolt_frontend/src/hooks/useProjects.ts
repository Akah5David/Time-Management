import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectService } from '../api/services';
import { handleApiError } from '../api/client';
import type { Project, PaginationParams } from '../types';
import toast from 'react-hot-toast';

const PROJECTS_KEY = 'projects';

export function useProjects(pagination?: PaginationParams) {
  return useQuery({
    queryKey: [PROJECTS_KEY, pagination],
    queryFn: async () => {
      try {
        const params: Record<string, unknown> = {};
        if (pagination) Object.assign(params, pagination);
        const response = await projectService.getAll(params);
        return response.data;
      } catch (error) {
        throw new Error(handleApiError(error));
      }
    },
  });
}

export function useProject(id: string) {
  return useQuery({
    queryKey: [PROJECTS_KEY, id],
    queryFn: async () => {
      try {
        const response = await projectService.getById(id);
        return response.data;
      } catch (error) {
        throw new Error(handleApiError(error));
      }
    },
    enabled: !!id,
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<Project>) => {
      const response = await projectService.create(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PROJECTS_KEY] });
      toast.success('Project created successfully');
    },
    onError: (error) => {
      toast.error(handleApiError(error));
    },
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Project> }) => {
      const response = await projectService.update(id, data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [PROJECTS_KEY] });
      queryClient.invalidateQueries({ queryKey: [PROJECTS_KEY, variables.id] });
      toast.success('Project updated successfully');
    },
    onError: (error) => {
      toast.error(handleApiError(error));
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await projectService.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PROJECTS_KEY] });
      toast.success('Project deleted successfully');
    },
    onError: (error) => {
      toast.error(handleApiError(error));
    },
  });
}
