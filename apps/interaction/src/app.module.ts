import { CommonModule } from '@app/common';
import { grpcProvider } from '@app/common/providers/grpc.provider';
import { Module } from '@nestjs/common';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  imports: [CommonModule, CommentModule, LikeModule, KafkaModule],
  controllers: [],
  providers: [grpcProvider],
})
export class AppModule {}
