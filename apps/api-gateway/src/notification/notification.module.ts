import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { GrpcClientModule } from '../grpc-client/grpc-client.module';

@Module({
  imports: [GrpcClientModule],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
