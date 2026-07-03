"use client";

import { Bell, CheckCheck } from "lucide-react";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";
import { LoadingState } from "@/components/shared/loading-state";
import { PageHeader } from "@/components/shared/page-header";
import { NotificationItemCard } from "@/features/notifications/components/notification-item-card";
import {
  useMarkAllRead,
  useMarkRead,
  useNotifications,
} from "@/features/notifications/hooks/use-notifications";

export default function NotificationsPage() {
  const notifications = useNotifications();
  const markRead = useMarkRead();
  const markAllRead = useMarkAllRead();

  const items =
    notifications.data?.pages.flatMap((page) => page.notifications) ?? [];
  const unreadCount = notifications.data?.pages[0]?.unread_count ?? 0;

  return (
    <DashboardLayout>
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 pb-10">
        <PageHeader
          title="Notifications"
          description="Track platform updates, badge unlocks, achievements, and account notices."
        >
          {unreadCount > 0 && (
            <Button
              variant="outline"
              onClick={() => markAllRead.mutate()}
              disabled={markAllRead.isPending}
            >
              <CheckCheck className="size-4" />
              Mark all read
            </Button>
          )}
        </PageHeader>

        {notifications.isLoading ? (
          <LoadingState message="Loading notifications..." />
        ) : notifications.error ? (
          <ErrorState
            title="Unable to load notifications"
            message="There was a problem loading your notification feed."
            onRetry={() => notifications.refetch()}
          />
        ) : items.length === 0 ? (
          <EmptyState
            icon={<Bell className="size-7" />}
            title="No notifications yet"
            description="Important updates and earned rewards will appear here."
          />
        ) : (
          <>
            <div className="space-y-3">
              {items.map((notification) => (
                <NotificationItemCard
                  key={notification.id}
                  notification={notification}
                  isMarkingRead={markRead.isPending}
                  onMarkRead={(notificationId) =>
                    markRead.mutate(notificationId)
                  }
                />
              ))}
            </div>

            {notifications.hasNextPage && (
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  onClick={() => notifications.fetchNextPage()}
                  disabled={notifications.isFetchingNextPage}
                >
                  {notifications.isFetchingNextPage
                    ? "Loading..."
                    : "Load more"}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
