"use client";

import { Flame } from "lucide-react";
import { useStreak } from "../hooks/use-gamification";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export function StreakWidget() {
  const { data, isLoading, isError } = useStreak();

  if (isLoading) {
    return <Skeleton className="h-6 w-24 rounded-full" />;
  }

  if (isError || !data) {
    return null;
  }

  const { current_streak } = data;

  return (
    <Badge
      variant="secondary"
      className="flex items-center gap-1.5 px-3 py-1 text-sm font-semibold bg-orange-100 text-orange-700 hover:bg-orange-200 dark:bg-orange-950/50 dark:text-orange-400 dark:hover:bg-orange-950/70"
    >
      <Flame className="size-4" />
      {current_streak > 0 ? `${current_streak} Day Streak` : "Start a streak!"}
    </Badge>
  );
}
