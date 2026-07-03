"use client";

import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useXP } from "@/features/gamification/hooks/use-gamification";
import { formatNumber } from "@/lib/utils";

export function XPWidget() {
  const { data, isLoading, isError } = useXP();

  if (isLoading) {
    return <Skeleton className="h-6 w-28 rounded-full" />;
  }

  if (isError || !data) {
    return null;
  }

  return (
    <Badge variant="secondary" className="flex items-center gap-1.5 px-3 py-1">
      <Sparkles className="size-4" />
      Level {data.current_level} • {formatNumber(data.total_xp)} XP
    </Badge>
  );
}
