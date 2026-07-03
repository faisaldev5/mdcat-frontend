"use client";

import { Trophy } from "lucide-react";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";
import { LoadingState } from "@/components/shared/loading-state";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { AchievementList } from "@/features/gamification/components/achievement-list";
import { BadgeGrid } from "@/features/gamification/components/badge-grid";
import { StreakSummaryCard } from "@/features/gamification/components/streak-summary-card";
import { XPProgressCard } from "@/features/gamification/components/xp-progress-card";
import {
  useAchievements,
  useBadges,
  useStreak,
  useXP,
} from "@/features/gamification/hooks/use-gamification";

export default function AchievementsPage() {
  const xp = useXP();
  const streak = useStreak();
  const badges = useBadges();
  const achievements = useAchievements();

  const isLoading =
    xp.isLoading || streak.isLoading || badges.isLoading || achievements.isLoading;
  const hasError = xp.error || streak.error || badges.error || achievements.error;

  const earnedBadgeCount =
    badges.data?.badges.filter((badge) => badge.earned).length ?? 0;

  return (
    <DashboardLayout>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 pb-10">
        <PageHeader
          title="Milestones & Achievements"
          description="Track your XP, streaks, badges, and earned achievements."
        />

        {isLoading ? (
          <LoadingState message="Loading achievements..." />
        ) : hasError ? (
          <ErrorState
            title="Unable to load achievements"
            message="There was a problem loading your gamification progress."
            onRetry={() => {
              xp.refetch();
              streak.refetch();
              badges.refetch();
              achievements.refetch();
            }}
          />
        ) : !xp.data || !streak.data || !badges.data || !achievements.data ? (
          <EmptyState
            icon={<Trophy className="size-7" />}
            title="No gamification data yet"
            description="Complete quizzes to begin earning XP, streaks, badges, and achievements."
          />
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
              <XPProgressCard xp={xp.data} />
              <StatCard
                label="Badges Earned"
                value={`${earnedBadgeCount}/${badges.data.badges.length}`}
                icon={<Trophy className="size-5 text-primary" />}
              />
            </div>

            <StreakSummaryCard streak={streak.data} />

            <section className="space-y-4">
              <h2 className="text-xl font-heading font-semibold">
                Badge Showcase
              </h2>
              <BadgeGrid badges={badges.data.badges} />
            </section>

            <AchievementList achievements={achievements.data.achievements} />
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
