"use client";

import { BarChart3 } from "lucide-react";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";
import { LoadingState } from "@/components/shared/loading-state";
import { PageHeader } from "@/components/shared/page-header";
import { ChapterBreakdown } from "@/features/analytics/components/chapter-breakdown";
import { PerformanceOverview } from "@/features/analytics/components/performance-overview";
import { SubjectAccuracyChart } from "@/features/analytics/components/subject-accuracy-chart";
import { WeakAreaList } from "@/features/analytics/components/weak-area-list";
import { usePerformance } from "@/features/analytics/hooks/use-analytics";

export default function AnalyticsPage() {
  const { data, isLoading, error, refetch } = usePerformance();

  const hasPerformanceData =
    Boolean(data?.subject_performance.length) ||
    Boolean(data?.chapter_performance.length);

  return (
    <DashboardLayout>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 pb-10">
        <PageHeader
          title="Performance Analytics"
          description="Review your progress and identify areas for improvement."
        />

        {isLoading ? (
          <LoadingState message="Loading analytics..." />
        ) : error ? (
          <ErrorState
            title="Unable to load analytics"
            message="There was a problem loading your performance analytics."
            onRetry={refetch}
          />
        ) : !data || !hasPerformanceData ? (
          <EmptyState
            icon={<BarChart3 className="size-7" />}
            title="No analytics yet"
            description="Complete quizzes to unlock subject accuracy, chapter breakdowns, and priority review areas."
          />
        ) : (
          <>
            <PerformanceOverview performance={data} />

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
              <SubjectAccuracyChart subjects={data.subject_performance} />
              <WeakAreaList chapters={data.chapter_performance} />
            </div>

            <ChapterBreakdown chapters={data.chapter_performance} />
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
