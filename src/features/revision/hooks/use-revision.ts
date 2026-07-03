"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants/query-keys";
import { toast } from "@/components/shared/toaster";
import { revisionService } from "@/services/revision.service";
import type {
  RevisionQuestionsResponse,
  ToggleBookmarkVariables,
} from "@/features/revision/types";

// =============================================================================
// Revision React Query Hooks
// =============================================================================

export function useBookmarks() {
  return useQuery({
    queryKey: queryKeys.revision.bookmarks(),
    queryFn: revisionService.getBookmarks,
    staleTime: 30_000,
  });
}

export function useWrongQuestions() {
  return useQuery({
    queryKey: queryKeys.revision.wrongQuestions(),
    queryFn: revisionService.getWrongQuestions,
    staleTime: 30_000,
  });
}

export function useToggleBookmark() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ questionId }: ToggleBookmarkVariables) =>
      revisionService.toggleBookmark(questionId),
    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.revision.bookmarks(),
      });

      const previousBookmarks =
        queryClient.getQueryData<RevisionQuestionsResponse>(
          queryKeys.revision.bookmarks()
        );

      queryClient.setQueryData<RevisionQuestionsResponse>(
        queryKeys.revision.bookmarks(),
        (current) => {
          if (!current) {
            return current;
          }

          if (variables.isBookmarked) {
            return {
              questions: current.questions.filter(
                (question) => question.question_id !== variables.questionId
              ),
            };
          }

          if (!variables.question) {
            return current;
          }

          const alreadyExists = current.questions.some(
            (question) => question.question_id === variables.questionId
          );

          if (alreadyExists) {
            return current;
          }

          return {
            questions: [
              { ...variables.question, wrong_count: 0 },
              ...current.questions,
            ],
          };
        }
      );

      return { previousBookmarks };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousBookmarks) {
        queryClient.setQueryData(
          queryKeys.revision.bookmarks(),
          context.previousBookmarks
        );
      }

      toast({
        title: "Bookmark update failed",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
    },
    onSuccess: (data) => {
      toast({
        title: data.is_bookmarked ? "Bookmark added" : "Bookmark removed",
        variant: "success",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.revision.bookmarks(),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.dashboard.stats(),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.quiz.all,
      });
    },
  });
}
