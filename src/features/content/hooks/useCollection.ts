import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/constants/query-keys';
import { contentService } from '@/services/content.service';

export const useCollection = (id: number) => {
  return useQuery({
    queryKey: queryKeys.collections.detail(id),
    queryFn: () => contentService.getCollection(id),
    enabled: !!id,
  });
};
