import {
  LIKE_SERVICE_NAME,
  LikeDto,
  LikeParams,
  LikeServiceClient,
  LikeWhere,
  LikeWhereUnique,
} from '@app/common/types/like';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { MicroService } from '../grpc-client/microservice';

@Injectable()
export class LikeService implements OnModuleInit {
  private likeClient: LikeServiceClient;
  constructor(
    @Inject(MicroService.INTERACTION_SERVICE)
    private readonly client: ClientGrpc,
  ) {}
  onModuleInit() {
    this.likeClient =
      this.client.getService<LikeServiceClient>(LIKE_SERVICE_NAME);
  }

  async create(like: LikeDto) {
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
}
