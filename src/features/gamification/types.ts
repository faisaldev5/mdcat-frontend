// =============================================================================
// Gamification Feature Types
// =============================================================================
// Matches MDCAT_Platform_REST_Gamification_Controller and services.

export interface StreakSummary {
  current_streak: number;
  longest_streak: number;
  total_active_days: number;
  last_active_date: string | null;
}

export interface XPTransaction {
  amount: number;
  source: string;
  description: string;
  created_at: string;
}

export interface XPSummary {
  total_xp: number;
  current_level: number;
  xp_in_level: number;
  xp_for_next_level: number;
  progress_percentage: number;
  is_max_level: boolean;
  recent_transactions: XPTransaction[];
}

export interface BadgeReward {
  slug: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  earned: boolean;
  earned_at: string | null;
}

export interface BadgesResponse {
  badges: BadgeReward[];
}

export interface AchievementReward {
  slug: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  earned: true;
  earned_at: string;
}

export interface AchievementsResponse {
  achievements: AchievementReward[];
}

export type LeaderboardType = "weekly" | "monthly" | "all_time";

export interface LeaderboardEntry {
  rank: number;
  display_name: string;
  total_xp: number;
  level: number;
}

export interface LeaderboardResponse {
  type: LeaderboardType;
  period_label: string;
  rankings: LeaderboardEntry[];
  current_user: LeaderboardEntry;
}
