export type NotificationCategory =
  | 'appointment'
  | 'medicine'
  | 'alert'
  | 'emergency'
  | 'system';

export interface HealthNotification {
  id: string;
  category: NotificationCategory;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  actionUrl?: string;
}
