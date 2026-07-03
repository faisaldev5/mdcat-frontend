import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { apiGet, apiPost } from "@/services/api-client";
import type {
  RevisionQuestionsResponse,
  ToggleBookmarkResponse,
} from "@/features/revision/types";

// =============================================================================
// Revision Service
// =============================================================================
// API service layer for bookmarks and wrong-question revision.

export const revisionService = {
  getBookmarks: async (): Promise<RevisionQuestionsResponse> => {
    return apiGet<RevisionQuestionsResponse>(API_ENDPOINTS.REVISION_BOOKMARKS);
  },

  getWrongQuestions: async (): Promise<RevisionQuestionsResponse> => {
    return apiGet<RevisionQuestionsResponse>(
      API_ENDPOINTS.REVISION_WRONG_QUESTIONS
    );
  },

  toggleBookmark: async (
    questionId: number
  ): Promise<ToggleBookmarkResponse> => {
    return apiPost<ToggleBookmarkResponse>(
      API_ENDPOINTS.REVISION_BOOKMARKS_TOGGLE,
      { question_id: questionId }
    );
  },
};
