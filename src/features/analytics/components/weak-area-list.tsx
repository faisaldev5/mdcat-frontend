"use client";

import Link from "next/link";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ROUTES } from "@/constants/routes";
import { formatPercent } from "@/lib/utils";
import type { ChapterPerformance } from "@/features/analytics/types";

interface WeakAreaListProps {
  chapters: ChapterPerformance[];
}

export function WeakAreaList({ chapters }: WeakAreaListProps) {
  const weakChapters = chapters
    .filter((chapter) => chapter.performance_label === "Weak")
    .slice(0, 5);
  const priorityChapters =
    weakChapters.length > 0 ? weakChapters : chapters.slice(0, 5);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-3">
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="size-5 text-destructive" />
          Priority Review
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          render={<Link href={ROUTES.WRONG_QUESTIONS} />}
        >
          Wrong Questions
          <ArrowRight className="size-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {priorityChapters.map((chapter) => (
          <div
            key={chapter.chapter_id}
            className="rounded-lg border border-border p-4"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold">{chapter.chapter_title}</p>
                <p className="text-sm text-muted-foreground">
                  {chapter.subject_title} • {chapter.total_questions} questions
                </p>
              </div>
              <Badge variant={chapter.performance_label === "Weak" ? "destructive" : "secondary"}>
                {formatPercent(chapter.accuracy_percentage)} accuracy
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
