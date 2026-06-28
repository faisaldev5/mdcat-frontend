"use client";

import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { DashboardHero } from "@/features/dashboard/components/dashboard-hero";
import { DashboardStats } from "@/features/dashboard/components/dashboard-stats";
import { ContinueLearningCard } from "@/features/dashboard/components/continue-learning-card";
import { DashboardProgress } from "@/features/dashboard/components/dashboard-progress";
import { StudyPlanCard } from "@/features/dashboard/components/study-plan-card";

export default function DashboardPage() {
  // Prevent Next.js hydration mismatch
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <DashboardLayout>
        <div className="flex w-full flex-col space-y-6">
          <div className="h-20 animate-pulse rounded-lg bg-muted" />
          <div className="h-64 animate-pulse rounded-lg bg-muted" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex w-full flex-col gap-6 max-w-6xl mx-auto pb-10">
        <DashboardHero />
        
        <DashboardStats />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ContinueLearningCard />
          <DashboardProgress />
        </div>
        
        <StudyPlanCard />
      </div>
    </DashboardLayout>
  );
}
