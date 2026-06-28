import apiClient from "./api-client";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import type { ApiResponse } from "@/types/api";
import type { StreakSummary } from "@/features/gamification/types";

export const gamificationService = {
  getStreak: async (): Promise<StreakSummary> => {
    const { data } = await apiClient.get<ApiResponse<StreakSummary>>(
      API_ENDPOINTS.GAMIFICATION_STREAK
    );
    return data.data;
  },
};
