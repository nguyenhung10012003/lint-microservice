import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { GrpcClientModule } from '../grpc-client/grpc-client.module';

@Module({
  imports: [GrpcClientModule],
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}
