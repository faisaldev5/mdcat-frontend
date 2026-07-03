// =============================================================================
// Notifications Feature Types
// =============================================================================
// Matches MDCAT_Platform_REST_Notification_Controller and Notification_Service.

export interface NotificationItem {
  id: number;
  type: string;
  title: string;
  message: string;
  icon: string;
  source_type: string;
  source_id: number;
  is_read: boolean;
  created_at: string;
}

export interface NotificationsResponse {
  notifications: NotificationItem[];
  unread_count: number;
  page: number;
  per_page: number;
}

export interface NotificationReadResponse {
  unread_count: number;
}
