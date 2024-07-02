import {
  REPLY_SERVICE_NAME,
  ReplyDto,
  ReplyParams,
  ReplyServiceClient,
  ReplyUpdateDto,
  ReplyWhereUnique,
} from '@app/common/types/comment';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { MicroService } from '../grpc-client/microservice';

@Injectable()
export class ReplyService implements OnModuleInit {
  private replyService: ReplyServiceClient;
  constructor(
    @Inject(MicroService.INTERACTION_SERVICE)
    private readonly client: ClientGrpc,
  ) {}
  onModuleInit() {
    this.replyService =
      this.client.getService<ReplyServiceClient>(REPLY_SERVICE_NAME);
  }

  async create(reply: ReplyDto) {
    return this.replyService.create(reply);
  }

  async find(params: ReplyParams) {
    return this.replyService.find(params);
  }

  async findOne(where: ReplyWhereUnique) {
    return this.replyService.findOne(where);
  }

  async delete(where: ReplyWhereUnique) {
    return this.replyService.delete(where);
  }

  async update(reply: ReplyUpdateDto) {
    return this.replyService.update(reply);
  }
}
