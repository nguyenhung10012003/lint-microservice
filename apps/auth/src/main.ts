import { AUTH_PACKAGE_NAME } from '@app/common/types/auth';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.GRPC,
      options: {
        url: process.env.AUTH_URL || '127.0.0.1:5001',
        package: AUTH_PACKAGE_NAME,
        protoPath: join(__dirname, '../auth.proto'),
      },
    },
  );
  await app.listen();
}
bootstrap();
