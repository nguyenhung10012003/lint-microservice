import { Module } from '@nestjs/common';
import { GrpcClientModule } from '../grpc-client/grpc-client.module';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';

@Module({
  imports: [GrpcClientModule],
  controllers: [FeedController],
  providers: [FeedService],
})
export class FeedModule {}
