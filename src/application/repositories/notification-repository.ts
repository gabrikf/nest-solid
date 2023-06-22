import { Notification } from '../entities/notifications';

export abstract class NotificationRepository {
  abstract create(notification: Notification): Promise<void>;
  abstract findById(notificationId: string): Promise<Notification | null>;
  abstract edit(notification: Notification): Promise<void>;
  abstract countManyByRecipientId(notificationId: string): Promise<number>;
  abstract findManyByRecipientId(
    notificationId: string,
  ): Promise<Notification[]>;
}
