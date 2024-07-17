import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { FollowingController } from './following.controller';
import { FollowingService } from './following.service';
import { KafkaModule } from '../kafka/kafka.module';

@Module({
  imports: [KafkaModule],
  controllers: [FollowingController],
  providers: [FollowingService, PrismaService],
})
export class FollowingModule {}
