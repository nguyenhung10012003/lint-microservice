import { CommonModule } from '@app/common';
import { grpcProvider } from '@app/common/providers/grpc.provider';
import { Module } from '@nestjs/common';
import { NotificationModule } from './notification/notification.module';
import { SocketModule } from './socket/socket.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    NotificationModule,
    CommonModule,
    SocketModule,
    KafkaModule,
  ],
  controllers: [],
  providers: [grpcProvider],
})
export class AppModule {}
