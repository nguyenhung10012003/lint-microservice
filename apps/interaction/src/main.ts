import { INTERACTION_PACKAGE_NAME } from '@app/common/types/comment';
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
        package: INTERACTION_PACKAGE_NAME,
        protoPath: [
          join(__dirname, '../like.proto'),
          join(__dirname, '../comment.proto'),
        ],
      },
    },
  );
  await app.listen();
}
bootstrap();
