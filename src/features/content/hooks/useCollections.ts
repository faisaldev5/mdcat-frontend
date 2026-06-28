import { useQuery } from '@tanstack/react-query';  
import { queryKeys } from '@/constants/query-keys';  
import { contentService } from '@/services/content.service';  
  
export const useCollections = (chapterId?: number) => { return useQuery({ queryKey: queryKeys.collections.list(chapterId), queryFn: () => contentService.getCollections(chapterId) }); }; 
