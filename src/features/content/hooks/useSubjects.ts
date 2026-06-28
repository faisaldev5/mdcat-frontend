import { useQuery } from '@tanstack/react-query';  
import { queryKeys } from '@/constants/query-keys';  
import { contentService } from '@/services/content.service';  
  
export const useSubjects = () => { return useQuery({ queryKey: queryKeys.subjects.list(), queryFn: contentService.getSubjects }); }; 
