import { Notification } from '@application/entities/notifications';
import { NotificationRepository } from '@application/repositories/notification-repository';

export class InMemoryNotificationsRepository implements NotificationRepository {
  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    return this.notifications.filter(
      (notification) => notification.recipientId === recipientId,
    );
  }
  public notifications: Notification[] = [];
  async findById(notificationId: string): Promise<Notification | null> {
    const notification = this.notifications.find(
      (notification) => notification.id === notificationId,
    );
    return notification;
  }
  async edit(notification: Notification): Promise<void> {
    const notificationIndex = await this.notifications.findIndex(
      (item) => item.id === notification.id,
    );
    if (notificationIndex) {
      this.notifications[notificationIndex] = notification;
    }
  }
  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification);
  }
  async countManyByRecipientId(recipientId: string): Promise<number> {
    return this.notifications.filter(
      (notification) =>
        notification.recipientId === recipientId && !notification.readAt,
    ).length;
  }
}
