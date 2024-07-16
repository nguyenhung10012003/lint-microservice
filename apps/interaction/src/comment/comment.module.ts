import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { ReplyController } from './reply.controller';
import { ReplyService } from './reply.service';
import { KafkaModule } from '../kafka/kafka.module';

@Module({
  imports: [KafkaModule],
  controllers: [CommentController, ReplyController],
  providers: [CommentService, PrismaService, ReplyService],
})
export class CommentModule {}
