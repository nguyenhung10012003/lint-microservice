import { Module } from '@nestjs/common';
import { GrpcClientModule } from '../grpc-client/grpc-client.module';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';

@Module({
  imports: [GrpcClientModule],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
