import { Notification } from '@application/entities/notifications';

export class NotificationViewModel {
  static toHttp(notification: Notification) {
    return {
      id: notification.id,
      content: notification.content,
      category: notification.content,
      recipientId: notification.recipientId,
    };
  }
}
