"use client";

import { Trophy } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, formatNumber, getInitials } from "@/lib/utils";
import type {
  LeaderboardEntry,
  LeaderboardResponse,
} from "@/features/gamification/types";

interface LeaderboardTableProps {
  leaderboard: LeaderboardResponse;
}

export function LeaderboardTable({ leaderboard }: LeaderboardTableProps) {
  const visibleCurrentUser = leaderboard.rankings.some(
    (entry) => entry.rank === leaderboard.current_user.rank
  );
  const rows = visibleCurrentUser
    ? leaderboard.rankings
    : [...leaderboard.rankings, leaderboard.current_user].sort(
        (a, b) => a.rank - b.rank
      );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-3">
          <span>{leaderboard.period_label}</span>
          <Badge variant="secondary">Your rank #{leaderboard.current_user.rank}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {rows.length === 0 ? (
          <div className="py-10 text-center text-sm text-muted-foreground">
            No leaderboard activity yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b text-left text-xs uppercase text-muted-foreground">
                  <th className="px-3 py-3 font-semibold">Rank</th>
                  <th className="px-3 py-3 font-semibold">Student</th>
                  <th className="px-3 py-3 text-right font-semibold">Level</th>
                  <th className="px-3 py-3 text-right font-semibold">XP Earned</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((entry) => (
                  <LeaderboardRow
                    key={`${entry.rank}-${entry.display_name}`}
                    entry={entry}
                    isCurrentUser={entry.rank === leaderboard.current_user.rank}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function LeaderboardRow({
  entry,
  isCurrentUser,
}: {
  entry: LeaderboardEntry;
  isCurrentUser: boolean;
}) {
  return (
    <tr
      className={cn(
        "border-b last:border-b-0",
        isCurrentUser && "bg-primary/5"
      )}
    >
      <td className="px-3 py-4 font-semibold">
        <div className="flex items-center gap-2">
          {entry.rank <= 3 && <Trophy className="size-4 text-primary" />}
          #{entry.rank}
        </div>
      </td>
      <td className="px-3 py-4">
        <div className="flex items-center gap-3">
          <Avatar className="size-9">
            <AvatarFallback className="text-xs font-semibold">
              {getInitials(entry.display_name || "Student")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">
              {isCurrentUser ? "You" : entry.display_name}
            </p>
            {isCurrentUser && (
              <Badge variant="outline" className="mt-1">
                Current
              </Badge>
            )}
          </div>
        </div>
      </td>
      <td className="px-3 py-4 text-right font-semibold">
        {entry.level}
      </td>
      <td className="px-3 py-4 text-right font-semibold text-primary">
        {formatNumber(entry.total_xp)}
      </td>
    </tr>
  );
}
