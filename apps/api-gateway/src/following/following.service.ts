import {
  FOLLOWING_SERVICE_NAME,
  FollowDto,
  FollowWhere,
  FollowingServiceClient,
} from '@app/common/types/following';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { MicroService } from '../grpc-client/microservice';

@Injectable()
export class FollowingService implements OnModuleInit {
  private followingClient: FollowingServiceClient;

  constructor(
    @Inject(MicroService.RELATIONSHIP_SERVICE)
    private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.followingClient = this.client.getService<FollowingServiceClient>(
      FOLLOWING_SERVICE_NAME,
    );
  }

  async create(follow: FollowDto) {
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
