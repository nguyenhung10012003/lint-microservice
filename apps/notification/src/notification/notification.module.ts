import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { GrpcClientModule } from '../grpc-client/grpc-client.module';
import { KafkaModule } from '../kafka/kafka.module';

@Module({
  imports: [PrismaModule, GrpcClientModule, KafkaModule],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
