import { useQuery } from '@tanstack/react-query';
import { analyticsService } from '../api/services';
import { handleApiError } from '../api/client';
import type { AnalyticsData } from '../types';

export function useAnalytics() {
  return useQuery({
    queryKey: ['analytics'],
    queryFn: async () => {
      try {
        const response = await analyticsService.getData();
        return response.data as AnalyticsData;
      } catch (error) {
        throw new Error(handleApiError(error));
      }
    },
  });
}
