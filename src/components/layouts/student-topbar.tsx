"use client";

import Link from "next/link";
import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ROUTES } from "@/constants/routes";
import { useAuthStore } from "@/stores/auth.store";
import { getUserInitials } from "@/lib/user-display";
import { useUnreadCount } from "@/features/notifications/hooks/use-notifications";

// =============================================================================
// Student Top Bar
// =============================================================================

interface StudentTopBarProps {
  className?: string;
}

export function StudentTopBar({ className }: StudentTopBarProps) {
  const user = useAuthStore((state) => state.user);
  const initials = getUserInitials(user);
  const { data: unreadCount = 0 } = useUnreadCount();

  return (
    <header
      className={cn(
        "flex items-center justify-between h-16 px-6 border-b border-border bg-card",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <div className="lg:hidden" />
      </div>

      <div className="flex items-center gap-3">
        {/* Notification bell */}
        <Button variant="ghost" size="icon" className="relative" render={<Link href={ROUTES.NOTIFICATIONS} />}>
          <Bell className="h-5 w-5 text-muted-foreground" />
          {unreadCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
          <span className="sr-only">Notifications</span>
        </Button>

        {/* User avatar */}
        <Button variant="ghost" size="icon" className="rounded-full" render={<Link href={ROUTES.PROFILE} />}>
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs font-semibold bg-primary/10 text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>
          <span className="sr-only">Profile</span>
        </Button>
      </div>
    </header>
  );
}
