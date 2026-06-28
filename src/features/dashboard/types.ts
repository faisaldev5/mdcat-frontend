export interface DashboardStats {
  total_attempts: number;
  total_correct_answers: number;
  total_wrong_answers: number;
  overall_accuracy: number;
  bookmarked_questions_count: number;
  weak_topics_count: number;
}

export interface DashboardProgress {
  overall: {
    completion_percentage: number;
    total_chapters: number;
    completed_chapters: number;
  };
  subjects: Array<{
    subject_id: number;
    subject_title: string;
    completion_percentage: number;
    total_chapters: number;
    completed_chapters: number;
  }>;
  chapters: Array<{
    chapter_id: number;
    chapter_title: string;
    subject_title: string;
    completion_percentage: number;
    total_collections: number;
    completed_collections: number;
  }>;
}

export interface ContinueLearning {
  curriculum_completed?: boolean;
  collection_id?: number;
  collection_title?: string;
  chapter_id?: number;
  chapter_title?: string;
  subject_id?: number;
  subject_title?: string;
}

export interface StudyPlanItem {
  type: 'revision' | 'learning' | 'practice';
  icon: string;
  title: string;
  target: string;
  context: string;
  detail: string;
}

export interface StudyPlan {
  priority_topics: Array<{
    chapter_id: number;
    chapter_title: string;
    subject_title: string;
    accuracy: number;
    completion: number;
    priority_score: number;
    performance_label: string;
    action: string;
  }>;
  weak_subjects: Array<{
    subject_id: number;
    subject_title: string;
    accuracy: number;
    completion: number;
    priority_score: number;
    performance_label: string;
    action: string;
  }>;
  continue_learning: ContinueLearning;
  revision_recommendations: {
    chapters: Array<{
      chapter_id: number;
      chapter_title: string;
      subject_title: string;
      wrong_count: number;
      question_count: number;
      action: string;
    }>;
    total_wrong_count: number;
    total_bookmark_count: number;
  };
  daily_plan: {
    items: StudyPlanItem[];
    streak_message: string;
    current_streak: number;
  };
}
