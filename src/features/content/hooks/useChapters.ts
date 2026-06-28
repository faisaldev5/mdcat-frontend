import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/constants/query-keys';
import { contentService } from '@/services/content.service';

export const useChapters = (subjectId?: number) => {
  return useQuery({
    queryKey: queryKeys.chapters.list(subjectId),
    queryFn: () => contentService.getChapters(subjectId),
  });
};
