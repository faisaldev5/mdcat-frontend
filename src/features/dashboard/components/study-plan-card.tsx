"use client";

import { useStudyPlan } from "../hooks/use-dashboard";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, BrainCircuit, RotateCcw } from "lucide-react";

export function StudyPlanCard() {
  const { data: studyPlan, isLoading, isError } = useStudyPlan();

  if (isLoading) {
    return <Skeleton className="h-64 rounded-xl" />;
  }

  if (isError || !studyPlan) {
    return null;
  }

  const { daily_plan, priority_topics, weak_subjects } = studyPlan;
  const isNewStudent = daily_plan.items.length === 0;

  return (
    <Card className="flex flex-col h-full col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BrainCircuit className="size-5" />
          AI Study Plan
        </CardTitle>
        <CardDescription>
          Your personalized learning recommendations
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isNewStudent ? (
          <div className="flex flex-col items-center justify-center py-8 text-center bg-muted/30 rounded-xl border border-dashed">
            <div className="bg-background p-3 rounded-full mb-3 shadow-sm">
              <BrainCircuit className="size-6 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium">No data yet</p>
            <p className="text-xs text-muted-foreground max-w-[250px] mt-1">
              Start attempting quizzes and our AI will analyze your performance to build a custom study plan.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-sm font-medium border-b pb-2">Today&apos;s Focus</h4>
              <div className="flex flex-col gap-3">
                {daily_plan.items.map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-start bg-muted/40 p-3 rounded-lg border border-border/50">
                    <div className="text-xl leading-none mt-0.5">{item.icon}</div>
                    <div>
                      <p className="text-xs font-semibold text-primary">{item.title}</p>
                      <p className="text-sm font-medium leading-tight my-0.5">{item.target}</p>
                      <p className="text-xs text-muted-foreground">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-medium border-b pb-2">Weak Topics</h4>
              {weak_subjects.length === 0 && priority_topics.length === 0 ? (
                <p className="text-xs text-muted-foreground italic py-2">
                  You don&apos;t have any weak topics yet. Keep up the good work!
                </p>
              ) : (
                <div className="flex flex-col gap-2">
                  {priority_topics.slice(0, 2).map((topic) => (
                    <div key={topic.chapter_id} className="flex items-center justify-between group p-2 hover:bg-muted/50 rounded-md transition-colors">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="size-4 text-destructive/70" />
                        <div>
                          <p className="text-sm font-medium leading-tight">{topic.chapter_title}</p>
                          <p className="text-xs text-muted-foreground">{topic.subject_title}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {topic.accuracy}%
                      </Badge>
                    </div>
                  ))}
                  {weak_subjects.slice(0, 1).map((subject) => (
                    <div key={subject.subject_id} className="flex items-center justify-between group p-2 hover:bg-muted/50 rounded-md transition-colors">
                      <div className="flex items-center gap-2">
                        <RotateCcw className="size-4 text-orange-500/70" />
                        <div>
                          <p className="text-sm font-medium leading-tight">{subject.subject_title}</p>
                          <p className="text-xs text-muted-foreground">Subject requires practice</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {subject.accuracy}%
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
