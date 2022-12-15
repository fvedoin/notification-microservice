import { Notification } from '@application/entities/notification';
import { NotificationRepository } from '@application/repositories/notification-repository';

export class InMemoryNotificationsRepository implements NotificationRepository {
  public notifications: Notification[] = [];

  async create(notification: Notification) {
    this.notifications.push(notification);
  }
}