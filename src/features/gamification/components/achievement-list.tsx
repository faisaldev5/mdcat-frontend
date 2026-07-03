"use client";

import { Trophy } from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import type { AchievementReward } from "@/features/gamification/types";

interface AchievementListProps {
  achievements: AchievementReward[];
}

export function AchievementList({ achievements }: AchievementListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Earned Achievements</CardTitle>
      </CardHeader>
      <CardContent>
        {achievements.length === 0 ? (
          <EmptyState
            icon={<Trophy className="size-7" />}
            title="No achievements earned yet"
            description="Complete quizzes, build streaks, and earn XP to unlock achievements."
            className="py-10"
          />
        ) : (
          <div className="space-y-3">
            {achievements.map((achievement) => (
              <div
                key={achievement.slug}
                className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-start gap-3">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xl">
                    {achievement.icon}
                  </div>
                  <div>
                    <p className="font-semibold">{achievement.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {achievement.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:justify-end">
                  <Badge variant="secondary">{achievement.category}</Badge>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(achievement.earned_at)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
