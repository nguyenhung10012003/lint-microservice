import {
  POST_SERVICE_NAME,
  PostDto,
  PostFindParams,
  PostServiceClient,
} from '@app/common/types/post';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { MicroService } from '../grpc-client/microservice';

@Injectable()
export class PostService implements OnModuleInit {
  private postClient: PostServiceClient;
  constructor(
    @Inject(MicroService.POST_SERVICE) private readonly client: ClientGrpc,
  ) {}
  onModuleInit() {
    this.postClient =
      this.client.getService<PostServiceClient>(POST_SERVICE_NAME);
  }

  async create(post: PostDto) {
    return this.postClient.create(post);
  }

  async findMany(params: PostFindParams) {
    return this.postClient.find(params);
  }

  async search(params: {
    key?: string;
    skip?: number;
    take?: number;
    tags?: string[];
    idsNotIn?: string[];
  }) {
    return this.postClient.search(params);
  }
}
