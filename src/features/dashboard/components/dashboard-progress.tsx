"use client";

import { useDashboardProgress } from "../hooks/use-dashboard";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardProgress() {
  const { data: progress, isLoading, isError } = useDashboardProgress();

  if (isLoading) {
    return <Skeleton className="h-48 rounded-xl" />;
  }

  if (isError || !progress) {
    return null;
  }

  const { overall, subjects } = progress;

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>Curriculum Progress</CardTitle>
        <CardDescription>Your overall completion status</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Overall</span>
            <span className="text-sm text-muted-foreground">
              {overall.completion_percentage}%
            </span>
          </div>
          <Progress value={overall.completion_percentage} className="h-2" />
          <p className="text-xs text-muted-foreground mt-2">
            {overall.completed_chapters} of {overall.total_chapters} chapters completed
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium">By Subject</h4>
          {subjects.map((subject) => (
            <div key={subject.subject_id}>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-medium">{subject.subject_title}</span>
                <span className="text-xs text-muted-foreground">
                  {subject.completion_percentage}%
                </span>
              </div>
              <Progress value={subject.completion_percentage} className="h-1.5" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
