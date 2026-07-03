"use client";

import { Sparkles } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatNumber } from "@/lib/utils";
import type { XPSummary } from "@/features/gamification/types";

interface XPProgressCardProps {
  xp: XPSummary;
}

export function XPProgressCard({ xp }: XPProgressCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="size-5 text-primary" />
          Overall Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-3xl font-heading font-bold">
            Level {xp.current_level} Scholar
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {formatNumber(xp.total_xp)} total XP
          </p>
        </div>

        <Progress value={xp.progress_percentage} />

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Level {xp.current_level}</span>
          {xp.is_max_level ? (
            <span>Max level reached</span>
          ) : (
            <span>
              {formatNumber(xp.xp_in_level)} /{" "}
              {formatNumber(xp.xp_for_next_level)} XP to level{" "}
              {xp.current_level + 1}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
