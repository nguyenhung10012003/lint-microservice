import {
  COMMENT_SERVICE_NAME,
  CommentDto,
  CommentParams,
  CommentServiceClient,
  CommentUpdateDto,
  CommentWhere,
  CommentWhereUnique,
} from '@app/common/types/comment';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { MicroService } from '../grpc-client/microservice';
import {
  NOTIFICATION_SERVICE_NAME,
  NotificationServiceClient,
} from '@app/common/types/notification';
import { POST_SERVICE_NAME, PostServiceClient } from '@app/common/types/post';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CommentService implements OnModuleInit {
  private commentService: CommentServiceClient;
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
    this.commentService =
      this.client.getService<CommentServiceClient>(COMMENT_SERVICE_NAME);
    this.notificationService =
      this.notificationClient.getService<NotificationServiceClient>(
        NOTIFICATION_SERVICE_NAME,
      );
    this.postService =
      this.postClient.getService<PostServiceClient>(POST_SERVICE_NAME);
  }

  async create(comment: CommentDto) {
    const post = await firstValueFrom(
      this.postService.findOne({ id: comment.postId }),
    );
    if (!post) {
      throw new Error('Post not found');
    }

    const postOwnerId = post.userId;
    const notification = {
      interactorId: comment.userId,
      postId: comment.postId,
      userId: postOwnerId,
      content: 'new comment',
    };
    await firstValueFrom(this.notificationService.create(notification));
    return this.commentService.create(comment);
  }

  async find(params: CommentParams) {
    return this.commentService.find(params);
  }

  async findOne(where: CommentWhereUnique) {
    return this.commentService.findOne(where);
  }

  async update(data: CommentUpdateDto) {
    return this.commentService.update(data);
  }

  async delete(where: CommentWhereUnique) {
    return this.commentService.delete(where);
  }

  async count(where: CommentWhere) {
    return this.commentService.count(where);
  }
}
