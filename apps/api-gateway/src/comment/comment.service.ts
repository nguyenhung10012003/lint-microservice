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

@Injectable()
export class CommentService implements OnModuleInit {
  private commentService: CommentServiceClient;
  constructor(
    @Inject(MicroService.INTERACTION_SERVICE)
    private readonly client: ClientGrpc,
  ) {}
  onModuleInit() {
    this.commentService =
      this.client.getService<CommentServiceClient>(COMMENT_SERVICE_NAME);
  }

  async create(comment: CommentDto) {
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
