"use client";

import { useState } from "react";
import { Trophy } from "lucide-react";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";
import { LoadingState } from "@/components/shared/loading-state";
import { PageHeader } from "@/components/shared/page-header";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { LeaderboardTable } from "@/features/gamification/components/leaderboard-table";
import { useLeaderboard } from "@/features/gamification/hooks/use-gamification";
import type { LeaderboardType } from "@/features/gamification/types";

const leaderboardTabs: Array<{ value: LeaderboardType; label: string }> = [
  { value: "weekly", label: "This Week" },
  { value: "monthly", label: "This Month" },
  { value: "all_time", label: "All Time" },
];

export default function LeaderboardPage() {
  const [type, setType] = useState<LeaderboardType>("weekly");
  const { data, isLoading, error, refetch } = useLeaderboard(type, 20);

  return (
    <DashboardLayout>
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 pb-10">
        <PageHeader
          title="Global Leaderboard"
          description="See how you rank against other students by XP earned."
        />

        <Tabs
          value={type}
          onValueChange={(value) => setType(value as LeaderboardType)}
        >
          <TabsList>
            {leaderboardTabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {leaderboardTabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="mt-4">
              {isLoading ? (
                <LoadingState message="Loading leaderboard..." />
              ) : error ? (
                <ErrorState
                  title="Unable to load leaderboard"
                  message="There was a problem loading rankings."
                  onRetry={refetch}
                />
              ) : !data ? (
                <EmptyState
                  icon={<Trophy className="size-7" />}
                  title="No leaderboard data yet"
                  description="Earn XP by completing quizzes to appear in rankings."
                />
              ) : (
                <LeaderboardTable leaderboard={data} />
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
