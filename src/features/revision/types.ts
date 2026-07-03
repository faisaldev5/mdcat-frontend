// =============================================================================
// Revision Feature Types
// =============================================================================
// Matches MDCAT_Platform_REST_Revision_Controller and Revision_Service.

export type RevisionOptionKey = "a" | "b" | "c" | "d";

export interface RevisionQuestion {
  question_id: number;
  question: string;
  options: Record<RevisionOptionKey, string>;
  correct_option: RevisionOptionKey;
  explanation: string | null;
  difficulty: string;
  collection_title: string;
  chapter_id: number;
  chapter_title: string;
  subject_title: string;
  wrong_count: number;
}

export interface RevisionQuestionsResponse {
  questions: RevisionQuestion[];
}

export interface ToggleBookmarkResponse {
  question_id: number;
  is_bookmarked: boolean;
}

export interface ToggleBookmarkVariables {
  questionId: number;
  isBookmarked: boolean;
  question?: RevisionQuestion;
}
