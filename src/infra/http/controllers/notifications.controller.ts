import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
//import { randomUUID } from 'node:crypto';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationViewModel } from '../view-models/notification-view-model';

import { SendNotification } from '@application/use-cases/send-notification';
import { CancelNotification } from '@application/use-cases/cancel-notification';
import { ReadNotification } from '@application/use-cases/read-notification';
import { UnreadNotification } from '@application/use-cases/unread-notification';
import { CountRecipientNotifications } from '@application/use-cases/count-recipient-notifications';
import { GetRecipientNotifications } from '@application/use-cases/get-recipient-notifications';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private countRecipientNotification: CountRecipientNotifications,
    private getRecipientNotifications: GetRecipientNotifications,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
  ) {}

  @Get('count/by/:recipientId')
  async countByRecipient(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientNotification.execute({
      recipientId,
    });

    return { count };
  }

  @Get('by/:recipientId')
  async getByRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId,
    });

    return {
      notifications: notifications.map(NotificationViewModel.toHTTP),
    };
  }

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({
      notificationId: id,
    });
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({
      notificationId: id,
    });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({
      notificationId: id,
    });
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { content, category, recipientId } = body;
    const { notification } = await this.sendNotification.execute({
      content,
      category,
      recipientId,
    });

    return {
      notification: NotificationViewModel.toHTTP(notification),
    };
  }
}
