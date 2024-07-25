import {
  FOLLOWING_SERVICE_NAME,
  FollowDto,
  FollowWhere,
  FollowingServiceClient,
} from '@app/common/types/following';
import {
  NOTIFICATION_SERVICE_NAME,
  NotificationServiceClient,
} from '@app/common/types/notification';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { MicroService } from '../grpc-client/microservice';

@Injectable()
export class FollowingService implements OnModuleInit {
  private followingClient: FollowingServiceClient;
  private notificationService: NotificationServiceClient;

  constructor(
    @Inject(MicroService.RELATIONSHIP_SERVICE)
    private readonly client: ClientGrpc,
    @Inject(MicroService.NOTIFICATION_SERVICE)
    private readonly notificationClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.followingClient = this.client.getService<FollowingServiceClient>(
      FOLLOWING_SERVICE_NAME,
    );
    this.notificationService =
      this.notificationClient.getService<NotificationServiceClient>(
        NOTIFICATION_SERVICE_NAME,
      );
  }

  async create(follow: FollowDto) {
    const notification = {
      interactorId: follow.followerId,
      userId: follow.followingId,
      content: 'new follower',
    };
    await firstValueFrom(this.notificationService.create(notification));
    return this.followingClient.create(follow);
  }

  async delete(id: string, followerId: string, followingId: string) {
    return this.followingClient.delete({ id, followerId, followingId });
  }

  async find(where: FollowWhere) {
    return this.followingClient.find(where);
  }

  async count(where: FollowWhere) {
    return this.followingClient.count(where);
  }
}
