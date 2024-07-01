import { grpcProvider } from '@app/common/providers/grpc.provider';
import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [],
  controllers: [PostController],
  providers: [PrismaService, PostService, grpcProvider],
})
export class PostModule {}
