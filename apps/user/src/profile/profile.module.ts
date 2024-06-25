import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [],
  controllers: [ProfileController],
  providers: [ProfileService, PrismaService],
})
export default class ProfileModule {}
