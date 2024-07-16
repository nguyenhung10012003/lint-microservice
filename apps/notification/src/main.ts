import { NOTIFICATION_PACKAGE_NAME } from '@app/common/types/notification';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: process.env.NOTIFICATION_URL || '127.0.0.1:5005',
      package: NOTIFICATION_PACKAGE_NAME,
      protoPath: [join(__dirname, '../notification.proto')],
    },
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
      },
      consumer: {
        groupId: 'notification-consumer',
      },
    },
  });
  await app.startAllMicroservices();

  // web socket server
  await app.listen(3001);
}
bootstrap();
