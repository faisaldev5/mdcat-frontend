import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { apiGet, apiPost } from "@/services/api-client";
import type {
  NotificationReadResponse,
  NotificationsResponse,
} from "@/features/notifications/types";

// =============================================================================
// Notification Service
// =============================================================================

export const notificationService = {
  getNotifications: async (page = 1): Promise<NotificationsResponse> => {
    return apiGet<NotificationsResponse>(API_ENDPOINTS.NOTIFICATIONS, {
      params: { page },
    });
  },

  getUnreadCount: async (): Promise<number> => {
    const response = await notificationService.getNotifications(1);
    return response.unread_count;
  },

  markRead: async (
    notificationId: number
  ): Promise<NotificationReadResponse> => {
    return apiPost<NotificationReadResponse>(
      API_ENDPOINTS.NOTIFICATION_READ(notificationId)
    );
  },

  markAllRead: async (): Promise<NotificationReadResponse> => {
    return apiPost<NotificationReadResponse>(
      API_ENDPOINTS.NOTIFICATIONS_READ_ALL
    );
  },
};
