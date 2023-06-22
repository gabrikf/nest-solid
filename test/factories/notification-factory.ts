import { Content } from '@application/entities/content';
import {
  Notification,
  NotificationProps,
} from '@application/entities/notifications';

export function makeNotification(overrides?: Partial<NotificationProps>) {
  return new Notification({
    category: 'test category',
    content: new Content('test content'),
    recipientId: 'recipient-id-1',
    ...overrides,
  });
}
