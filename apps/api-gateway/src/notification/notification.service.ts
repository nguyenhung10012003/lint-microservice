import {
  CreateNotificationDto,
  NOTIFICATION_SERVICE_NAME,
  NotificationFindParams,
  NotificationServiceClient,
  NotificationWhereUnique,
  UpdateNotificationDto,
} from '@app/common/types/notification';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { MicroService } from '../grpc-client/microservice';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class NotificationService {
  private notificationService: NotificationServiceClient;
  constructor(
    @Inject(MicroService.NOTIFICATION_SERVICE)
    private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.notificationService =
      this.client.getService<NotificationServiceClient>(
        NOTIFICATION_SERVICE_NAME,
      );
  }

  async create(notification: CreateNotificationDto) {
    return this.notificationService.create(notification);
  }

  async findMany(params: NotificationFindParams) {
    return this.notificationService.findMany(params);
  }

  async update(updateDto: UpdateNotificationDto, userId: string) {
    const notification = await firstValueFrom(
      this.notificationService.findOne({
        id: updateDto.id,
      }),
    );

    if (notification.userId !== userId) {
      throw new BadRequestException('Notification not found');
    }
    return this.notificationService.update(updateDto);
  }

  async delete(where: NotificationWhereUnique, userId: string) {
    const notification = await firstValueFrom(
      this.notificationService.findOne({
        id: where.id,
      }),
    );

    if (notification.userId !== userId) {
      throw new BadRequestException('Notification not found');
    }

    await firstValueFrom(this.notificationService.delete({ id: where.id }));
  }

  async findOne(where: NotificationWhereUnique) {
    return this.notificationService.findOne(where);
  }
}
