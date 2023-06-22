import { Injectable } from '@nestjs/common';
import { Notification } from '../../../../application/entities/notifications';
import { NotificationRepository } from '../../../../application/repositories/notification-repository';
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaNotificationsRepository implements NotificationRepository {
  constructor(private prismaService: PrismaService) {}

  async findManyByRecipientId(notificationId: string): Promise<Notification[]> {
    const rawNotification = await this.prismaService.notification.findMany({
      where: {
        id: notificationId,
      },
    });
    return rawNotification.map(PrismaNotificationMapper.toDomain);
  }

  async findById(notificationId: string): Promise<Notification> {
    const notification = await this.prismaService.notification.findUnique({
      where: {
        id: notificationId,
      },
    });
    return PrismaNotificationMapper.toDomain(notification);
  }

  async countManyByRecipientId(notificationId: string): Promise<number> {
    const count = await this.prismaService.notification.count({
      where: {
        id: notificationId,
      },
    });
    return count;
  }

  async create(rawNotification: Notification): Promise<void> {
    const notification = PrismaNotificationMapper.toPrisma(rawNotification);
    await this.prismaService.notification.create({
      data: notification,
    });
  }

  async edit(rawNotification: Notification): Promise<void> {
    const notification = PrismaNotificationMapper.toPrisma(rawNotification);
    await this.prismaService.notification.update({
      where: {
        id: notification.id,
      },
      data: notification,
    });
  }
}
