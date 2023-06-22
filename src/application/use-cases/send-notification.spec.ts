import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { SendNotification } from './send-notification';

describe('send notification use case', () => {
  const notificationRepositoryInMemory = new InMemoryNotificationsRepository();
  it('should be able to send a notification', async () => {
    const sendNotification = new SendNotification(
      notificationRepositoryInMemory,
    );
    const { notification } = await sendNotification.execute({
      category: 'test category',
      content: 'test content',
      recipientId: 'test recipient id',
    });
    expect(notificationRepositoryInMemory.notifications).toHaveLength(1);
    expect(notificationRepositoryInMemory.notifications[0]).toEqual(
      notification,
    );
  });
});
