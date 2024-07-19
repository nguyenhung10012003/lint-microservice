import { USER_PACKAGE_NAME } from '@app/common/types/user';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: [USER_PACKAGE_NAME],
        protoPath: [
          join(__dirname, '../user.proto'),
          join(__dirname, '../profile.proto'),
        ],
      },
    },
  );
  await app.listen();
}
bootstrap();
