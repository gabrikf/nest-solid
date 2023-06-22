import { Content } from './content';
import { Notification } from './notifications';

describe('Notification entity', () => {
  it('should be able to create a notification', () => {
    const notification = new Notification({
      category: 'test category',
      content: new Content('content test'),
      recipientId: 'recipient test',
    });
    expect(notification).toBeTruthy();
  });
});
