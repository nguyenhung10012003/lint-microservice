import {
  TAG_SERVICE_NAME,
  TagDto,
  TagFindParams,
  TagServiceClient,
  TagWhereUnique,
} from '@app/common/types/tag';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { MicroService } from '../grpc-client/microservice';

@Injectable()
export class TagService implements OnModuleInit {
  private tagClient: TagServiceClient;
  constructor(
    @Inject(MicroService.POST_SERVICE) private readonly client: ClientGrpc,
  ) {}
  onModuleInit() {
    this.tagClient = this.client.getService<TagServiceClient>(TAG_SERVICE_NAME);
  }

  async create(data: TagDto) {
    return this.tagClient.create(data);
  }

  async findMany(params: TagFindParams) {
    return this.tagClient.find(params);
  }

  async findOne(params: TagWhereUnique) {
    return this.tagClient.findOne(params);
  }
}
