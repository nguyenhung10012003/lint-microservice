import { Module } from '@nestjs/common';
import { GrpcClientModule } from '../grpc-client/grpc-client.module';
import { JwtModule } from '@nestjs/jwt';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
@Module({
  imports: [GrpcClientModule, JwtModule.register({})],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
