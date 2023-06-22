import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { ReadNotification } from './read-notification';
import { UnreadNotification } from './unread-notification';

describe('Unread notification use case', () => {
  const notificationRepositoryInMemory = new InMemoryNotificationsRepository();
  const unreadNotification = new UnreadNotification(
    notificationRepositoryInMemory,
  );
  it('should be able to unread a notification', async () => {
    const notification = makeNotification({
      readAt: new Date(),
    });
    await notificationRepositoryInMemory.create(notification);
    await unreadNotification.execute({
      notificationId: notification.id,
    });
    expect(notificationRepositoryInMemory.notifications[0].readAt).toBeNull();
  });

  it('should not be able to read a non existing notification', async () => {
    expect(() => {
      return unreadNotification.execute({
        notificationId: 'wrong_id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
