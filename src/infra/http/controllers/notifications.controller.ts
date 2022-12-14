import { Body, Controller, /* Get,  */ Post } from '@nestjs/common';
import { SendNotification } from 'src/application/use-cases/send-notification';
//import { randomUUID } from 'node:crypto';
import { CreateNotificationBody } from '../dtos/create-notification-body';
//import { PrismaService } from '../../prisma.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private sendNotification: SendNotification) {}

  /* @Get()
  index() {
    return this.prisma.notification.findMany();
  } */

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { content, category, recipientId } = body;
    const { notification } = await this.sendNotification.execute({
      content,
      category,
      recipientId,
    });

    return {
      notification,
    };
  }
}
