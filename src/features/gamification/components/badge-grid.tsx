"use client";

import { Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn, formatDate } from "@/lib/utils";
import type { BadgeReward } from "@/features/gamification/types";

interface BadgeGridProps {
  badges: BadgeReward[];
}

export function BadgeGrid({ badges }: BadgeGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {badges.map((badge) => (
        <Card
          key={badge.slug}
          className={cn(!badge.earned && "bg-muted/30 text-muted-foreground")}
        >
          <CardContent className="flex min-h-[210px] flex-col items-center justify-center p-5 text-center">
            <div
              className={cn(
                "flex size-16 items-center justify-center rounded-full border text-3xl",
                badge.earned
                  ? "border-primary bg-primary/5"
                  : "border-muted-foreground/20 bg-muted"
              )}
            >
              {badge.earned ? badge.icon : <Lock className="size-7" />}
            </div>
            <Badge variant={badge.earned ? "default" : "outline"} className="mt-3">
              {badge.category}
            </Badge>
            <p className="mt-3 font-semibold text-foreground">{badge.name}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {badge.description}
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              {badge.earned && badge.earned_at
                ? `Earned ${formatDate(badge.earned_at)}`
                : "Locked"}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
