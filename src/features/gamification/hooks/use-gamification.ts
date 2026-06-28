import { useQuery } from "@tanstack/react-query";
import { gamificationService } from "@/services/gamification.service";

export const gamificationKeys = {
  all: ["gamification"] as const,
  streak: () => [...gamificationKeys.all, "streak"] as const,
};

export function useStreak() {
  return useQuery({
    queryKey: gamificationKeys.streak(),
    queryFn: gamificationService.getStreak,
  });
}
