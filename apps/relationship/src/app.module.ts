import { CommonModule } from '@app/common';
import { grpcProvider } from '@app/common/providers/grpc.provider';
import { Module } from '@nestjs/common';
import { BlacklistModule } from './blacklist/blacklist.module';
import { FollowingModule } from './following/following.module';

@Module({
  imports: [CommonModule, FollowingModule, BlacklistModule],
  controllers: [],
  providers: [grpcProvider],
})
export class AppModule {}
