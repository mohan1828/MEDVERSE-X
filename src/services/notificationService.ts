import { type HealthNotification } from '../types/notification';

const mockNotifications: HealthNotification[] = [
  {
    id: 'notif-101',
    category: 'appointment',
    title: 'Upcoming Tele-Health Consultation',
    message: 'Dr. Aris Thorne, MD scheduled for 10:30 AM tomorrow.',
    timestamp: '10 mins ago',
    isRead: false,
    priority: 'normal'
  },
  {
    id: 'notif-102',
    category: 'medicine',
    title: 'Evening Supplement Stack Reminder',
    message: 'Ingest EPA/DHA 2000mg & CoQ10 200mg at 08:00 PM.',
    timestamp: '45 mins ago',
    isRead: false,
    priority: 'normal'
  },
  {
    id: 'notif-103',
    category: 'emergency',
    title: 'Sub-Millisecond Watchdog Checkpoint',
    message: 'Arrhythmia threshold nominal. Watchdog latency < 0.4ms.',
    timestamp: '2 hours ago',
    isRead: true,
    priority: 'high'
  },
  {
    id: 'notif-104',
    category: 'alert',
    title: 'Federated Global Model Update',
    message: 'Round #43 FedAvg completed across 142 hospital nodes.',
    timestamp: '4 hours ago',
    isRead: true,
    priority: 'low'
  }
];

export const notificationService = {
  async getNotifications(): Promise<HealthNotification[]> {
    return mockNotifications;
  },

  async markAsRead(notificationId: string): Promise<void> {
    const notif = mockNotifications.find(n => n.id === notificationId);
    if (notif) notif.isRead = true;
  }
};
