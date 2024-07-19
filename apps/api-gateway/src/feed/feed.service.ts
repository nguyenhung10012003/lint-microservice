import {
  COMMENT_SERVICE_NAME,
  CommentServiceClient,
} from '@app/common/types/comment';
import {
  FOLLOWING_SERVICE_NAME,
  FollowingServiceClient,
} from '@app/common/types/following';
import { LIKE_SERVICE_NAME, LikeServiceClient } from '@app/common/types/like';
import { POST_SERVICE_NAME, PostServiceClient } from '@app/common/types/post';
import { SortOrder } from '@app/common/types/query';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { MicroService } from '../grpc-client/microservice';

@Injectable()
export class FeedService implements OnModuleInit {
  private postService: PostServiceClient;
  private followingService: FollowingServiceClient;
  private likeService: LikeServiceClient;
  private commentService: CommentServiceClient;
  constructor(
    @Inject(MicroService.RELATIONSHIP_SERVICE)
    private readonly relationshipClient: ClientGrpc,
    @Inject(MicroService.POST_SERVICE) private readonly postClient: ClientGrpc,
    @Inject(MicroService.INTERACTION_SERVICE)
    private readonly interactionClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.postService =
      this.postClient.getService<PostServiceClient>(POST_SERVICE_NAME);
    this.followingService =
      this.relationshipClient.getService<FollowingServiceClient>(
        FOLLOWING_SERVICE_NAME,
      );
    this.likeService =
      this.interactionClient.getService<LikeServiceClient>(LIKE_SERVICE_NAME);
    this.commentService =
      this.interactionClient.getService<CommentServiceClient>(
        COMMENT_SERVICE_NAME,
      );
  }

  async getFeed(userId: string, skip?: number, take?: number) {
    const following = await lastValueFrom(
      this.followingService.find({
        followerId: userId,
      }),
    );

    const followingIds = following.follows?.map((follow) => follow.followingId);
    if (!followingIds) return [];

    return this.postService.find({
      where: {
        userId: {
          in: followingIds,
        },
      },
      orderBy: {
        createdAt: SortOrder.DESC,
      },
      skip,
      take,
    });
  }
}
