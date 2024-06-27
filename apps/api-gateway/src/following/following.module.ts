import { Module } from '@nestjs/common';
import { GrpcClientModule } from '../grpc-client/grpc-client.module';
import { FollowingController } from './following.controller';
import { FollowingService } from './following.service';

@Module({
  imports: [GrpcClientModule],
  controllers: [FollowingController],
  providers: [FollowingService],
})
export class FollowingModule {}
