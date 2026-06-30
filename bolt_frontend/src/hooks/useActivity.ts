import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../api/services';
import { handleApiError } from '../api/client';
import type { Activity } from '../types';

export function useActivity() {
  return useQuery({
    queryKey: ['activity'],
    queryFn: async () => {
      try {
        const response = await dashboardService.getActivity();
        return response.data as Activity[];
      } catch (error) {
        throw new Error(handleApiError(error));
      }
    },
  });
}
