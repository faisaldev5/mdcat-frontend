import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/constants/query-keys';
import { contentService } from '@/services/content.service';

export const useChapter = (id: number) => {
  return useQuery({
    queryKey: queryKeys.chapters.detail(id),
    queryFn: () => contentService.getChapter(id),
    enabled: !!id,
  });
};
