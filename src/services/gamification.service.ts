import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { apiGet } from "@/services/api-client";
import type {
  AchievementsResponse,
  BadgesResponse,
  LeaderboardResponse,
  LeaderboardType,
  StreakSummary,
  XPSummary,
} from "@/features/gamification/types";

export const gamificationService = {
  getStreak: async (): Promise<StreakSummary> => {
    return apiGet<StreakSummary>(API_ENDPOINTS.GAMIFICATION_STREAK);
  },

  getXP: async (): Promise<XPSummary> => {
    return apiGet<XPSummary>(API_ENDPOINTS.GAMIFICATION_XP);
  },

  getBadges: async (): Promise<BadgesResponse> => {
    return apiGet<BadgesResponse>(API_ENDPOINTS.GAMIFICATION_BADGES);
  },

  getAchievements: async (): Promise<AchievementsResponse> => {
    return apiGet<AchievementsResponse>(
      API_ENDPOINTS.GAMIFICATION_ACHIEVEMENTS
    );
  },

  getLeaderboard: async (
    type: LeaderboardType = "weekly",
    limit = 20
  ): Promise<LeaderboardResponse> => {
    return apiGet<LeaderboardResponse>(
      API_ENDPOINTS.GAMIFICATION_LEADERBOARD,
      { params: { type, limit } }
    );
  },
};
