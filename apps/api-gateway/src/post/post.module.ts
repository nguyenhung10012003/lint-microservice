import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { GrpcClientModule } from '../grpc-client/grpc-client.module';
import { AwsS3Service } from '../s3/aws-s3.service';

@Module({
  imports: [GrpcClientModule],
  controllers: [PostController],
  providers: [PostService, AwsS3Service],
})
export class PostModule {}
