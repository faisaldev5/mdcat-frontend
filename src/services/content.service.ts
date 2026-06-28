import { publicApiClient } from "@/services/api-client";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { Subject, Chapter, Collection } from "@/features/content/types";

export const contentService = {
  getSubjects: async (): Promise<Subject[]> => {
    const response = await publicApiClient.get(API_ENDPOINTS.SUBJECTS);
    return response.data.data;
  },

  getSubject: async (id: number): Promise<Subject> => {
    const response = await publicApiClient.get(API_ENDPOINTS.SUBJECT_DETAIL(id));
    return response.data.data;
  },

  getChapters: async (subjectId?: number): Promise<Chapter[]> => {
    const url = subjectId 
      ? `${API_ENDPOINTS.CHAPTERS}?subject_id=${subjectId}` 
      : API_ENDPOINTS.CHAPTERS;
    const response = await publicApiClient.get(url);
    return response.data.data;
  },

  getChapter: async (id: number): Promise<Chapter> => {
    const response = await publicApiClient.get(API_ENDPOINTS.CHAPTER_DETAIL(id));
    return response.data.data;
  },

  getCollections: async (chapterId?: number): Promise<Collection[]> => {
    const url = chapterId 
      ? `${API_ENDPOINTS.COLLECTIONS}?chapter_id=${chapterId}` 
      : API_ENDPOINTS.COLLECTIONS;
    const response = await publicApiClient.get(url);
    return response.data.data;
  },

  getCollection: async (id: number): Promise<Collection> => {
    const response = await publicApiClient.get(API_ENDPOINTS.COLLECTION_DETAIL(id));
    return response.data.data;
  },
};
