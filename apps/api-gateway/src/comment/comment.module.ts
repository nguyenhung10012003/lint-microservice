import { Module } from '@nestjs/common';
import { GrpcClientModule } from '../grpc-client/grpc-client.module';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { ReplyController } from './reply.controller';
import { ReplyService } from './reply.service';

@Module({
  imports: [GrpcClientModule],
  controllers: [CommentController, ReplyController],
  providers: [CommentService, ReplyService],
})
export class CommentModule {}
