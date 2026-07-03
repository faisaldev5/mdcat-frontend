"use client";

import { CalendarDays, Flame, Trophy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import type { StreakSummary } from "@/features/gamification/types";

interface StreakSummaryCardProps {
  streak: StreakSummary;
}

export function StreakSummaryCard({ streak }: StreakSummaryCardProps) {
  return (
    <Card>
      <CardContent className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-3">
        <StreakMetric
          icon={<Flame className="size-5 text-orange-600" />}
          label="Current Streak"
          value={`${streak.current_streak} days`}
        />
        <StreakMetric
          icon={<Trophy className="size-5 text-primary" />}
          label="Longest Streak"
          value={`${streak.longest_streak} days`}
        />
        <StreakMetric
          icon={<CalendarDays className="size-5 text-primary" />}
          label="Last Active"
          value={
            streak.last_active_date
              ? formatDate(streak.last_active_date)
              : "Not yet"
          }
        />
      </CardContent>
    </Card>
  );
}

function StreakMetric({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
      <div className="flex size-10 items-center justify-center rounded-lg bg-background">
        {icon}
      </div>
      <div>
        <p className="text-xs font-semibold uppercase text-muted-foreground">
          {label}
        </p>
        <p className="font-heading text-xl font-bold">{value}</p>
      </div>
    </div>
  );
}
