"use client";

import { AlertTriangle, BookOpenCheck, CircleCheck, Target } from "lucide-react";
import { StatCard } from "@/components/shared/stat-card";
import { formatNumber, formatPercent } from "@/lib/utils";
import type { AnalyticsPerformanceResponse } from "@/features/analytics/types";

interface PerformanceOverviewProps {
  performance: AnalyticsPerformanceResponse;
}

export function PerformanceOverview({ performance }: PerformanceOverviewProps) {
  const totalQuestions = performance.subject_performance.reduce(
    (sum, subject) => sum + subject.total_questions,
    0
  );
  const correctAnswers = performance.subject_performance.reduce(
    (sum, subject) => sum + subject.correct_answers,
    0
  );
  const overallAccuracy =
    totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;
  const weakChapters = performance.chapter_performance.filter(
    (chapter) => chapter.performance_label === "Weak"
  ).length;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
      <StatCard
        label="Accuracy"
        value={formatPercent(overallAccuracy)}
        icon={<Target className="size-5 text-primary" />}
      />
      <StatCard
        label="Questions Answered"
        value={formatNumber(totalQuestions)}
        icon={<CircleCheck className="size-5 text-primary" />}
      />
      <StatCard
        label="Subjects Practiced"
        value={performance.subject_performance.length}
        icon={<BookOpenCheck className="size-5 text-primary" />}
      />
      <StatCard
        label="Weak Chapters"
        value={weakChapters}
        icon={<AlertTriangle className="size-5 text-destructive" />}
      />
    </div>
  );
}
