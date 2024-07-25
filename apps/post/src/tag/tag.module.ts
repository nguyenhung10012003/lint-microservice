import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { PrismaService } from '../prisma.service';
import { TagController } from './tag.controller';
import { grpcProvider } from '@app/common/providers/grpc.provider';

@Module({
  imports: [],
  controllers: [TagController],
  providers: [TagService, PrismaService, grpcProvider],
})
export class TagModule {}
