import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notifications';
import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotification } from './count-recipient-notification';
import { GetRecipientNotification } from './get-recipient-notification';
import { SendNotification } from './send-notification';

describe('send notification use case', () => {
  const notificationRepositoryInMemory = new InMemoryNotificationsRepository();
  const countRecipientNotifications = new GetRecipientNotification(
    notificationRepositoryInMemory,
  );
  it('should be able to send a notification', async () => {
    await notificationRepositoryInMemory.create(makeNotification());
    await notificationRepositoryInMemory.create(makeNotification());
    await notificationRepositoryInMemory.create(
      makeNotification({ recipientId: 'recipient-id-2' }),
    );
    const { notifications } = await countRecipientNotifications.execute({
      recipientId: 'recipient-id-1',
    });
    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual([
      expect.objectContaining({ recipientId: 'recipient-id-1' }),
      expect.objectContaining({ recipientId: 'recipient-id-1' }),
    ]);
  });
});
