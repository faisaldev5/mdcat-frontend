"use client";

import { useAuthStore } from "@/stores/auth.store";
import { getUserDisplayName } from "@/lib/user-display";
import { StreakWidget } from "@/features/gamification/components/streak-widget";
import { XPWidget } from "@/features/gamification/components/xp-widget";

export function DashboardHero() {
  const user = useAuthStore((state) => state.user);
  const displayName = getUserDisplayName(user);

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
      <div>
        <h1 className="text-3xl font-heading font-bold tracking-tight">
          Welcome back, {displayName.split(" ")[0]}!
        </h1>
        <p className="text-muted-foreground mt-1">
          Ready to continue your MDCAT preparation? Let&apos;s make today count.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <XPWidget />
        <StreakWidget />
      </div>
    </div>
  );
}
