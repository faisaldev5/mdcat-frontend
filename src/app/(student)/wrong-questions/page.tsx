"use client";

import { AlertCircle } from "lucide-react";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";
import { LoadingState } from "@/components/shared/loading-state";
import { PageHeader } from "@/components/shared/page-header";
import { RevisionQuestionCard } from "@/features/revision/components/revision-question-card";
import {
  useBookmarks,
  useToggleBookmark,
  useWrongQuestions,
} from "@/features/revision/hooks/use-revision";
import type { RevisionQuestion } from "@/features/revision/types";

export default function WrongQuestionsPage() {
  const wrongQuestions = useWrongQuestions();
  const bookmarks = useBookmarks();
  const toggleBookmark = useToggleBookmark();

  const bookmarkIds = new Set(
    bookmarks.data?.questions.map((question) => question.question_id) ?? []
  );

  const handleToggle = (question: RevisionQuestion, isBookmarked: boolean) => {
    toggleBookmark.mutate({
      questionId: question.question_id,
      isBookmarked,
      question,
    });
  };

  const isLoading = wrongQuestions.isLoading || bookmarks.isLoading;
  const hasError = wrongQuestions.error || bookmarks.error;

  return (
    <DashboardLayout>
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 pb-10">
        <PageHeader
          title="Wrong Questions"
          description="Focus on questions you missed, ordered by recent mistakes and frequency."
        />

        {isLoading ? (
          <LoadingState message="Loading wrong questions..." />
        ) : hasError ? (
          <ErrorState
            title="Unable to load wrong questions"
            message="There was a problem loading your revision questions."
            onRetry={() => {
              wrongQuestions.refetch();
              bookmarks.refetch();
            }}
          />
        ) : !wrongQuestions.data ||
          wrongQuestions.data.questions.length === 0 ? (
          <EmptyState
            icon={<AlertCircle className="size-7" />}
            title="No wrong questions yet"
            description="Complete quizzes and any missed questions will appear here for focused revision."
          />
        ) : (
          <div className="space-y-4">
            {wrongQuestions.data.questions.map((question) => (
              <RevisionQuestionCard
                key={question.question_id}
                question={question}
                isBookmarked={bookmarkIds.has(question.question_id)}
                isBookmarkPending={toggleBookmark.isPending}
                showWrongCount
                onToggleBookmark={handleToggle}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
