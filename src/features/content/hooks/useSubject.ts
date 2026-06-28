import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/constants/query-keys';
import { contentService } from '@/services/content.service';

export const useSubject = (id: number) => {
  return useQuery({
    queryKey: queryKeys.subjects.detail(id),
    queryFn: () => contentService.getSubject(id),
    enabled: !!id,
  });
};
