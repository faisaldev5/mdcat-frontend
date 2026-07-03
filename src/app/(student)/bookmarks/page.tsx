"use client";

import { Bookmark } from "lucide-react";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";
import { LoadingState } from "@/components/shared/loading-state";
import { PageHeader } from "@/components/shared/page-header";
import { RevisionQuestionCard } from "@/features/revision/components/revision-question-card";
import {
  useBookmarks,
  useToggleBookmark,
} from "@/features/revision/hooks/use-revision";
import type { RevisionQuestion } from "@/features/revision/types";

export default function BookmarksPage() {
  const { data, isLoading, error, refetch } = useBookmarks();
  const toggleBookmark = useToggleBookmark();

  const handleToggle = (question: RevisionQuestion, isBookmarked: boolean) => {
    toggleBookmark.mutate({
      questionId: question.question_id,
      isBookmarked,
      question,
    });
  };

  return (
    <DashboardLayout>
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 pb-10">
        <PageHeader
          title="Bookmarked Questions"
          description="Review questions you saved for another pass."
        />

        {isLoading ? (
          <LoadingState message="Loading bookmarks..." />
        ) : error ? (
          <ErrorState
            title="Unable to load bookmarks"
            message="There was a problem loading your bookmarked questions."
            onRetry={refetch}
          />
        ) : !data || data.questions.length === 0 ? (
          <EmptyState
            icon={<Bookmark className="size-7" />}
            title="No bookmarks yet"
            description="Save questions from quiz review or wrong-question revision to build your personal revision list."
          />
        ) : (
          <div className="space-y-4">
            {data.questions.map((question) => (
              <RevisionQuestionCard
                key={question.question_id}
                question={question}
                isBookmarked
                isBookmarkPending={toggleBookmark.isPending}
                onToggleBookmark={handleToggle}
              />
            ))}
          </div>
        )}

        {data && data.questions.length > 0 && (
          <div className="flex justify-center">
            <Button variant="outline" onClick={() => refetch()}>
              Refresh bookmarks
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
