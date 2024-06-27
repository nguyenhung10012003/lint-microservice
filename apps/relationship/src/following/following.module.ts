import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { FollowingController } from './following.controller';
import { FollowingService } from './following.service';

@Module({
  imports: [],
  controllers: [FollowingController],
  providers: [FollowingService, PrismaService],
})
export class FollowingModule {}
