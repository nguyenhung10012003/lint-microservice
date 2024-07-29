import {
  NOTIFICATION_SERVICE_NAME,
  NotificationFindParams,
  NotificationServiceClient,
  NotificationWhereUnique,
  UpdateStatusDto,
} from '@app/common/types/notification';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { MicroService } from '../grpc-client/microservice';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class NotificationService implements OnModuleInit {
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

  async findMany(params: NotificationFindParams) {
    return this.notificationService.findMany(params);
  }

  async delete(where: NotificationWhereUnique) {
    return this.notificationService.delete(where);
  }

  async updateStatus(updateStatusDto: UpdateStatusDto) {
    return this.notificationService.updateStatus(updateStatusDto);
  }

  countUnread(userId: string) {
    return this.notificationService.countUnread({ userId });
  }
}
