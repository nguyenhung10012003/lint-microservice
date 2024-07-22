import { Module } from '@nestjs/common';
import { GrpcClientModule } from '../grpc-client/grpc-client.module';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { AwsS3Service } from '../s3/aws-s3.service';

@Module({
  imports: [GrpcClientModule],
  controllers: [ProfileController],
  providers: [ProfileService, AwsS3Service],
})
export class ProfileModule {}
