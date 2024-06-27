import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { BlacklistController } from './blacklist.controller';
import { BlacklistService } from './blacklist.service';

@Module({
  imports: [],
  controllers: [BlacklistController],
  providers: [BlacklistService, PrismaService],
})
export class BlacklistModule {}
