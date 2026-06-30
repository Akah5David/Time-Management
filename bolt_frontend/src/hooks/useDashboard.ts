import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../api/services';
import { handleApiError } from '../api/client';
import type { DashboardStats } from '../types';

export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: async () => {
      try {
        const response = await dashboardService.getStats();
        return response.data as DashboardStats;
      } catch (error) {
        throw new Error(handleApiError(error));
      }
    },
  });
}

export function useDashboardActivity() {
  return useQuery({
    queryKey: ['dashboard', 'activity'],
    queryFn: async () => {
      try {
        const response = await dashboardService.getActivity();
        return response.data;
      } catch (error) {
        throw new Error(handleApiError(error));
      }
    },
  });
}
