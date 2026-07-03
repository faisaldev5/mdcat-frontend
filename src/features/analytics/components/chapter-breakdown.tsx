"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn, formatPercent } from "@/lib/utils";
import type {
  ChapterPerformance,
  PerformanceLabel,
} from "@/features/analytics/types";

interface ChapterBreakdownProps {
  chapters: ChapterPerformance[];
}

const labelClasses: Record<PerformanceLabel, string> = {
  Strong: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
  Average: "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300",
  Weak: "bg-destructive/10 text-destructive",
};

export function ChapterBreakdown({ chapters }: ChapterBreakdownProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Chapter Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {chapters.map((chapter) => (
          <div key={chapter.chapter_id} className="space-y-2 rounded-lg border p-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="font-semibold">{chapter.chapter_title}</p>
                <p className="text-sm text-muted-foreground">
                  {chapter.subject_title} • {chapter.correct_answers} correct •{" "}
                  {chapter.wrong_answers} wrong
                </p>
              </div>
              <Badge
                variant="secondary"
                className={cn(labelClasses[chapter.performance_label])}
              >
                {chapter.performance_label}
              </Badge>
            </div>

            <Progress value={chapter.accuracy_percentage} />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{formatPercent(chapter.accuracy_percentage)} accuracy</span>
              <span>{chapter.total_questions} questions</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
