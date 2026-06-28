import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/services/dashboard.service";

export const dashboardKeys = {
  all: ["dashboard"] as const,
  stats: () => [...dashboardKeys.all, "stats"] as const,
  progress: () => [...dashboardKeys.all, "progress"] as const,
  continueLearning: () => [...dashboardKeys.all, "continue-learning"] as const,
  studyPlan: () => [...dashboardKeys.all, "study-plan"] as const,
};

export function useDashboardStats() {
  return useQuery({
    queryKey: dashboardKeys.stats(),
    queryFn: dashboardService.getStats,
  });
}

export function useDashboardProgress() {
  return useQuery({
    queryKey: dashboardKeys.progress(),
    queryFn: dashboardService.getProgress,
  });
}

export function useContinueLearning() {
  return useQuery({
    queryKey: dashboardKeys.continueLearning(),
    queryFn: dashboardService.getContinueLearning,
  });
}

export function useStudyPlan() {
  return useQuery({
    queryKey: dashboardKeys.studyPlan(),
    queryFn: dashboardService.getStudyPlan,
  });
}
