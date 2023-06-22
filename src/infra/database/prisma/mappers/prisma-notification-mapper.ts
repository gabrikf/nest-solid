import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notifications';

import { Notification as PrismaNotification } from '@prisma/client';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      category: notification.category,
      content: notification.content.value,
      recipientId: notification.recipientId,
      createdAt: notification.createdAt,
    };
  }
  static toDomain(notification: PrismaNotification): Notification {
    return new Notification(
      {
        category: notification.category,
        content: new Content(notification.content),
        recipientId: notification.recipientId,
        createdAt: notification.createdAt,
        readAt: notification.readAt,
      },
      notification.id,
    );
  }
}
