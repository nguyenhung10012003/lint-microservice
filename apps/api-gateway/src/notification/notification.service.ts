import {
  CreateNotificationDto,
  NOTIFICATION_SERVICE_NAME,
  NotificationFindParams,
  NotificationServiceClient,
  NotificationWhereUnique,
  UpdateNotificationDto,
} from '@app/common/types/notification';
import { Inject, Injectable } from '@nestjs/common';
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

  async update(updateDto: UpdateNotificationDto) {
    return this.notificationService.update(updateDto);
  }

  async delete(where: NotificationWhereUnique) {
    console.log('delete request' + where.id);
    await firstValueFrom(this.notificationService.delete({ id: where.id }));
  }
}
