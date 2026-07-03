import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { apiGet } from "@/services/api-client";
import type { AnalyticsPerformanceResponse } from "@/features/analytics/types";

// =============================================================================
// Analytics Service
// =============================================================================

export const analyticsService = {
  getPerformance: async (): Promise<AnalyticsPerformanceResponse> => {
    return apiGet<AnalyticsPerformanceResponse>(
      API_ENDPOINTS.ANALYTICS_PERFORMANCE
    );
  },
};
