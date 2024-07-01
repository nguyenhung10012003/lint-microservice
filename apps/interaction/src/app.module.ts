import { CommonModule } from '@app/common';
import { grpcProvider } from '@app/common/providers/grpc.provider';
import { Module } from '@nestjs/common';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';

@Module({
  imports: [CommonModule, CommentModule, LikeModule],
  controllers: [],
  providers: [grpcProvider],
})
export class AppModule {}
