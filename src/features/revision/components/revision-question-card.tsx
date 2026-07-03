"use client";

import {
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Layers,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type {
  RevisionOptionKey,
  RevisionQuestion,
} from "@/features/revision/types";

interface RevisionQuestionCardProps {
  question: RevisionQuestion;
  isBookmarked: boolean;
  isBookmarkPending?: boolean;
  showWrongCount?: boolean;
  onToggleBookmark: (question: RevisionQuestion, isBookmarked: boolean) => void;
}

const optionKeys: RevisionOptionKey[] = ["a", "b", "c", "d"];

const optionLabels: Record<RevisionOptionKey, string> = {
  a: "A",
  b: "B",
  c: "C",
  d: "D",
};

export function RevisionQuestionCard({
  question,
  isBookmarked,
  isBookmarkPending,
  showWrongCount,
  onToggleBookmark,
}: RevisionQuestionCardProps) {
  return (
    <Card>
      <CardHeader className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{question.subject_title}</Badge>
          <Badge variant="outline">{question.chapter_title}</Badge>
          <Badge variant="outline">{question.difficulty}</Badge>
          {showWrongCount && question.wrong_count > 0 && (
            <Badge className="bg-destructive/10 text-destructive">
              <XCircle className="size-3" />
              {question.wrong_count} wrong
            </Badge>
          )}
        </div>

        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 space-y-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Layers className="size-4" />
              <span className="truncate">{question.collection_title}</span>
            </div>
            <CardTitle className="text-base leading-relaxed sm:text-lg">
              {question.question}
            </CardTitle>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className={cn(isBookmarked && "text-amber-500")}
            disabled={isBookmarkPending}
            onClick={() => onToggleBookmark(question, isBookmarked)}
            aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
          >
            {isBookmarked ? (
              <BookmarkCheck className="size-5" />
            ) : (
              <Bookmark className="size-5" />
            )}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid gap-2">
          {optionKeys.map((key) => {
            const isCorrect = question.correct_option === key;

            return (
              <div
                key={key}
                className={cn(
                  "flex items-start gap-3 rounded-lg border p-3 text-sm",
                  isCorrect
                    ? "border-emerald-500 bg-emerald-50 text-emerald-950 dark:bg-emerald-950/30 dark:text-emerald-100"
                    : "border-border bg-card"
                )}
              >
                <span
                  className={cn(
                    "flex size-7 shrink-0 items-center justify-center rounded-md text-xs font-bold",
                    isCorrect
                      ? "bg-emerald-500 text-white"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {optionLabels[key]}
                </span>
                <span className="flex-1 pt-1 leading-relaxed">
                  {question.options[key]}
                </span>
                {isCorrect && (
                  <span className="flex items-center gap-1 pt-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                    <CheckCircle2 className="size-3" />
                    Correct
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {question.explanation && (
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950/30">
            <p className="text-xs font-semibold uppercase text-blue-700 dark:text-blue-300">
              Explanation
            </p>
            <p className="mt-1 text-sm leading-relaxed text-blue-950 dark:text-blue-100">
              {question.explanation}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
