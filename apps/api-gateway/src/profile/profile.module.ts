import { Module } from '@nestjs/common';
import { GrpcClientModule } from '../grpc-client/grpc-client.module';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  imports: [GrpcClientModule],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
