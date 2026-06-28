export interface Subject {
  id: number;
  name: string;
  slug: string;
  created_at: string;
}

export interface Chapter {
  id: number;
  name: string;
  slug: string;
  subject_id: number;
  subject_name: string;
  created_at: string;
}

export interface Collection {
  id: number;
  title: string;
  type: string;
  description: string;
  status: string;
  sort_order: number;
  chapter_id: number;
  chapter_name: string;
  subject_name: string;
  created_at: string;
}
