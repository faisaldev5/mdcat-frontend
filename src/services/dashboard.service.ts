import apiClient from "./api-client";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import type { ApiResponse } from "@/types/api";
import type {
  DashboardStats,
  DashboardProgress,
  ContinueLearning,
  StudyPlan,
} from "@/features/dashboard/types";

export const dashboardService = {
  getStats: async (): Promise<DashboardStats> => {
    const { data } = await apiClient.get<ApiResponse<DashboardStats>>(
      API_ENDPOINTS.DASHBOARD_STATS
    );
    return data.data;
  },

  getProgress: async (): Promise<DashboardProgress> => {
    const { data } = await apiClient.get<ApiResponse<DashboardProgress>>(
      API_ENDPOINTS.DASHBOARD_PROGRESS
    );
    return data.data;
  },

  getContinueLearning: async (): Promise<ContinueLearning> => {
    const { data } = await apiClient.get<ApiResponse<ContinueLearning>>(
      API_ENDPOINTS.DASHBOARD_CONTINUE_LEARNING
    );
    return data.data;
  },

  getStudyPlan: async (): Promise<StudyPlan> => {
    const { data } = await apiClient.get<ApiResponse<StudyPlan>>(
      API_ENDPOINTS.DASHBOARD_STUDY_PLAN
    );
    return data.data;
  },
};
