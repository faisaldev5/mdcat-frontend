// =============================================================================
// Analytics Feature Types
// =============================================================================
// Matches MDCAT_Platform_REST_Analytics_Controller and Performance_Analytics.

export interface SubjectPerformance {
  subject_id: number;
  subject_title: string;
  total_questions: number;
  correct_answers: number;
  wrong_answers: number;
  accuracy_percentage: number;
}

export type PerformanceLabel = "Strong" | "Average" | "Weak";

export interface ChapterPerformance {
  chapter_id: number;
  chapter_title: string;
  subject_title: string;
  total_questions: number;
  correct_answers: number;
  wrong_answers: number;
  accuracy_percentage: number;
  performance_label: PerformanceLabel;
}

export interface AnalyticsPerformanceResponse {
  subject_performance: SubjectPerformance[];
  chapter_performance: ChapterPerformance[];
}
