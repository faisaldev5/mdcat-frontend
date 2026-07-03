"use client";

import { Flame, Sparkles } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useStreak, useXP } from "@/features/gamification/hooks/use-gamification";
import { formatNumber } from "@/lib/utils";

interface SidebarXPWidgetProps {
  collapsed?: boolean;
}

export function SidebarXPWidget({ collapsed }: SidebarXPWidgetProps) {
  const xp = useXP();
  const streak = useStreak();

  if (collapsed) {
    return null;
  }

  if (xp.isLoading || streak.isLoading) {
    return (
      <div className="px-3 py-2">
        <Skeleton className="h-20 rounded-lg" />
      </div>
    );
  }

  if (xp.isError || streak.isError || !xp.data || !streak.data) {
    return null;
  }

  return (
    <div className="px-3 pb-3">
      <div className="space-y-2 rounded-lg border border-sidebar-border bg-sidebar-accent/40 p-3">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="flex items-center gap-1.5">
            <Sparkles className="size-3.5" />
            Level {xp.data.current_level}
          </span>
          <span>{formatNumber(xp.data.total_xp)} XP</span>
        </div>
        <Progress value={xp.data.progress_percentage} />
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Flame className="size-3.5 text-orange-600" />
          {streak.data.current_streak} day streak
        </div>
      </div>
    </div>
  );
}
