"use client";

import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";
import { queryKeys } from "@/constants/query-keys";
import { toast } from "@/components/shared/toaster";
import { notificationService } from "@/services/notification.service";
import type { NotificationsResponse } from "@/features/notifications/types";

type NotificationsInfiniteData = InfiniteData<NotificationsResponse, number>;

// =============================================================================
// Notifications React Query Hooks
// =============================================================================

export function useNotifications() {
  return useInfiniteQuery({
    queryKey: queryKeys.notifications.list(),
    queryFn: ({ pageParam }) =>
      notificationService.getNotifications(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.notifications.length < lastPage.per_page) {
        return undefined;
      }

      return lastPage.page + 1;
    },
    staleTime: 30_000,
  });
}

export function useUnreadCount() {
  return useQuery({
    queryKey: queryKeys.notifications.unreadCount(),
    queryFn: notificationService.getUnreadCount,
    staleTime: 30_000,
    refetchInterval: 60_000,
  });
}

export function useMarkRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: number) =>
      notificationService.markRead(notificationId),
    onMutate: async (notificationId) => {
      await Promise.all([
        queryClient.cancelQueries({
          queryKey: queryKeys.notifications.list(),
        }),
        queryClient.cancelQueries({
          queryKey: queryKeys.notifications.unreadCount(),
        }),
      ]);

      const previousNotifications =
        queryClient.getQueryData<NotificationsInfiniteData>(
          queryKeys.notifications.list()
        );
      const previousUnreadCount = queryClient.getQueryData<number>(
        queryKeys.notifications.unreadCount()
      );
      const wasUnread =
        previousNotifications?.pages.some((page) =>
          page.notifications.some(
            (notification) =>
              notification.id === notificationId && !notification.is_read
          )
        ) ?? false;

      queryClient.setQueryData<NotificationsInfiniteData>(
        queryKeys.notifications.list(),
        (current) => markNotificationRead(current, notificationId, wasUnread)
      );

      if (wasUnread && typeof previousUnreadCount === "number") {
        queryClient.setQueryData(
          queryKeys.notifications.unreadCount(),
          Math.max(0, previousUnreadCount - 1)
        );
      }

      return { previousNotifications, previousUnreadCount };
    },
    onError: (_error, _notificationId, context) => {
      if (context?.previousNotifications) {
        queryClient.setQueryData(
          queryKeys.notifications.list(),
          context.previousNotifications
        );
      }
      if (typeof context?.previousUnreadCount === "number") {
        queryClient.setQueryData(
          queryKeys.notifications.unreadCount(),
          context.previousUnreadCount
        );
      }

      toast({
        title: "Could not mark notification read",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        queryKeys.notifications.unreadCount(),
        data.unread_count
      );
      setFeedUnreadCount(queryClient, data.unread_count);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.notifications.all,
      });
    },
  });
}

export function useMarkAllRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: notificationService.markAllRead,
    onMutate: async () => {
      await Promise.all([
        queryClient.cancelQueries({
          queryKey: queryKeys.notifications.list(),
        }),
        queryClient.cancelQueries({
          queryKey: queryKeys.notifications.unreadCount(),
        }),
      ]);

      const previousNotifications =
        queryClient.getQueryData<NotificationsInfiniteData>(
          queryKeys.notifications.list()
        );
      const previousUnreadCount = queryClient.getQueryData<number>(
        queryKeys.notifications.unreadCount()
      );

      queryClient.setQueryData<NotificationsInfiniteData>(
        queryKeys.notifications.list(),
        (current) => markAllNotificationsRead(current)
      );
      queryClient.setQueryData(queryKeys.notifications.unreadCount(), 0);

      return { previousNotifications, previousUnreadCount };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousNotifications) {
        queryClient.setQueryData(
          queryKeys.notifications.list(),
          context.previousNotifications
        );
      }
      if (typeof context?.previousUnreadCount === "number") {
        queryClient.setQueryData(
          queryKeys.notifications.unreadCount(),
          context.previousUnreadCount
        );
      }

      toast({
        title: "Could not mark all notifications read",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        queryKeys.notifications.unreadCount(),
        data.unread_count
      );
      setFeedUnreadCount(queryClient, data.unread_count);
      toast({
        title: "Notifications marked read",
        variant: "success",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.notifications.all,
      });
    },
  });
}

function markNotificationRead(
  current: NotificationsInfiniteData | undefined,
  notificationId: number,
  wasUnread: boolean
): NotificationsInfiniteData | undefined {
  if (!current) {
    return current;
  }

  return {
    ...current,
    pages: current.pages.map((page) => ({
      ...page,
      unread_count: wasUnread
        ? Math.max(0, page.unread_count - 1)
        : page.unread_count,
      notifications: page.notifications.map((notification) =>
        notification.id === notificationId
          ? { ...notification, is_read: true }
          : notification
      ),
    })),
  };
}

function markAllNotificationsRead(
  current: NotificationsInfiniteData | undefined
): NotificationsInfiniteData | undefined {
  if (!current) {
    return current;
  }

  return {
    ...current,
    pages: current.pages.map((page) => ({
      ...page,
      unread_count: 0,
      notifications: page.notifications.map((notification) => ({
        ...notification,
        is_read: true,
      })),
    })),
  };
}

function setFeedUnreadCount(
  queryClient: ReturnType<typeof useQueryClient>,
  unreadCount: number
) {
  queryClient.setQueryData<NotificationsInfiniteData>(
    queryKeys.notifications.list(),
    (current) => {
      if (!current) {
        return current;
      }

      return {
        ...current,
        pages: current.pages.map((page) => ({
          ...page,
          unread_count: unreadCount,
        })),
      };
    }
  );
}
