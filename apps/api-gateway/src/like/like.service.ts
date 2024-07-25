import {
  LIKE_SERVICE_NAME,
  LikeDto,
  LikeParams,
  LikeServiceClient,
  LikeWhere,
  LikeWhereUnique,
} from '@app/common/types/like';
import {
  NOTIFICATION_SERVICE_NAME,
  NotificationServiceClient,
} from '@app/common/types/notification';
import { POST_SERVICE_NAME, PostServiceClient } from '@app/common/types/post';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { MicroService } from '../grpc-client/microservice';

@Injectable()
export class LikeService implements OnModuleInit {
  private likeClient: LikeServiceClient;
  private notificationService: NotificationServiceClient;
  private postService: PostServiceClient;
  constructor(
    @Inject(MicroService.INTERACTION_SERVICE)
    private readonly client: ClientGrpc,
    @Inject(MicroService.NOTIFICATION_SERVICE)
    private readonly notificationClient: ClientGrpc,
    @Inject(MicroService.POST_SERVICE)
    private readonly postClient: ClientGrpc,
  ) {}
  onModuleInit() {
    this.likeClient =
      this.client.getService<LikeServiceClient>(LIKE_SERVICE_NAME);
    this.notificationService =
      this.notificationClient.getService<NotificationServiceClient>(
        NOTIFICATION_SERVICE_NAME,
      );
    this.postService =
      this.postClient.getService<PostServiceClient>(POST_SERVICE_NAME);
  }

  async create(like: LikeDto) {
    const post = await firstValueFrom(
      this.postService.findOne({ id: like.postId }),
    );
    const postOwnerId = post.userId;
    const notification = {
      interactorId: like.userId,
      postId: like.postId,
      userId: postOwnerId,
      content: 'new like',
    };
    await firstValueFrom(this.notificationService.create(notification));
    return this.likeClient.create(like);
  }

  async delete(where: LikeWhereUnique) {
    return this.likeClient.delete(where);
  }

  async find(params: LikeParams) {
    return this.likeClient.find(params);
  }

  async count(where: LikeWhere) {
    return this.likeClient.count(where);
  }

  exists(params: { userId: string; postId: string }) {
    return this.likeClient.exists(params);
  }
}
