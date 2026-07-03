import { useQuery } from "@tanstack/react-query";
import { gamificationService } from "@/services/gamification.service";
import { queryKeys } from "@/constants/query-keys";
import type { LeaderboardType } from "@/features/gamification/types";

export function useStreak() {
  return useQuery({
    queryKey: queryKeys.gamification.streak(),
    queryFn: gamificationService.getStreak,
    staleTime: 60_000,
    gcTime: 10 * 60_000,
  });
}

export function useXP() {
  return useQuery({
    queryKey: queryKeys.gamification.xp(),
    queryFn: gamificationService.getXP,
    staleTime: 60_000,
    gcTime: 10 * 60_000,
  });
}

export function useBadges() {
  return useQuery({
    queryKey: queryKeys.gamification.badges(),
    queryFn: gamificationService.getBadges,
    staleTime: 60_000,
    gcTime: 10 * 60_000,
  });
}

export function useAchievements() {
  return useQuery({
    queryKey: queryKeys.gamification.achievements(),
    queryFn: gamificationService.getAchievements,
    staleTime: 60_000,
    gcTime: 10 * 60_000,
  });
}

export function useLeaderboard(type: LeaderboardType = "weekly", limit = 20) {
  return useQuery({
    queryKey: queryKeys.gamification.leaderboard(type, limit),
    queryFn: () => gamificationService.getLeaderboard(type, limit),
    staleTime: 2 * 60_000,
    gcTime: 10 * 60_000,
  });
}
