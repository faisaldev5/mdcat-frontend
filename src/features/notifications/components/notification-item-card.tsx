"use client";

import {
  Award,
  Bell,
  Check,
  ShieldCheck,
  Trophy,
  UserCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn, formatDate } from "@/lib/utils";
import type { NotificationItem } from "@/features/notifications/types";

interface NotificationItemCardProps {
  notification: NotificationItem;
  isMarkingRead?: boolean;
  onMarkRead: (notificationId: number) => void;
}

export function NotificationItemCard({
  notification,
  isMarkingRead,
  onMarkRead,
}: NotificationItemCardProps) {
  return (
    <Card
      className={cn(
        "transition-colors",
        !notification.is_read && "border-primary/30 bg-primary/5"
      )}
    >
      <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-start">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <NotificationIcon
            type={notification.type}
            sourceType={notification.source_type}
          />
        </div>

        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-semibold">{notification.title}</p>
            {!notification.is_read && <Badge>New</Badge>}
            <Badge variant="outline">{formatNotificationType(notification.type)}</Badge>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {notification.message}
          </p>
          <p className="text-xs text-muted-foreground">
            {formatDate(notification.created_at, {
              hour: "numeric",
              minute: "2-digit",
            })}
          </p>
        </div>

        {!notification.is_read && (
          <Button
            variant="outline"
            size="sm"
            disabled={isMarkingRead}
            onClick={() => onMarkRead(notification.id)}
          >
            <Check className="size-4" />
            Mark read
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

function NotificationIcon({
  type,
  sourceType,
}: {
  type: string;
  sourceType: string;
}) {
  const value = `${type} ${sourceType}`.toLowerCase();

  if (value.includes("badge")) {
    return <Award className="size-5" />;
  }

  if (value.includes("achievement")) {
    return <Trophy className="size-5" />;
  }

  if (value.includes("enrollment")) {
    return <UserCheck className="size-5" />;
  }

  if (value.includes("status")) {
    return <ShieldCheck className="size-5" />;
  }

  return <Bell className="size-5" />;
}

function formatNotificationType(type: string): string {
  return type
    .split("_")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
