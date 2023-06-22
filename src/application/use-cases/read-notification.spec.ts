import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { ReadNotification } from './read-notification';

describe('Read notification use case', () => {
  const notificationRepositoryInMemory = new InMemoryNotificationsRepository();
  const readNotification = new ReadNotification(notificationRepositoryInMemory);
  it('should be able to read a notification', async () => {
    const notification = makeNotification();
    await notificationRepositoryInMemory.create(notification);
    await readNotification.execute({
      notificationId: notification.id,
    });
    expect(notificationRepositoryInMemory.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to read a non existing notification', async () => {
    expect(() => {
      return readNotification.execute({
        notificationId: 'wrong_id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
