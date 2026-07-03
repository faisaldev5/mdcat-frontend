"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/query-keys";
import { analyticsService } from "@/services/analytics.service";

// =============================================================================
// Analytics React Query Hooks
// =============================================================================

export function usePerformance() {
  return useQuery({
    queryKey: queryKeys.analytics.performance(),
    queryFn: analyticsService.getPerformance,
    staleTime: 60_000,
    gcTime: 10 * 60_000,
  });
}
