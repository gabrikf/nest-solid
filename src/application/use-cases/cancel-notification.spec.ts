import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notifications';
import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-found';
import { SendNotification } from './send-notification';

describe('Cancel notification use case', () => {
  const notificationRepositoryInMemory = new InMemoryNotificationsRepository();
  const cancelNotification = new CancelNotification(
    notificationRepositoryInMemory,
  );
  it('should be able to cancel a notification', async () => {
    const notification = makeNotification();
    await notificationRepositoryInMemory.create(notification);
    await cancelNotification.execute({
      notificationId: notification.id,
    });
    expect(notificationRepositoryInMemory.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a non existing notification', async () => {
    expect(() => {
      return cancelNotification.execute({
        notificationId: 'wrong_id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
