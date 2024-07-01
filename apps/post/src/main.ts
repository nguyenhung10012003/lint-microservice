import { POST_PACKAGE_NAME } from '@app/common/types/post';
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
        url: process.env.POST_URL,
        package: POST_PACKAGE_NAME,
        protoPath: [
          join(__dirname, '../post.proto'),
          join(__dirname, '../media.proto'),
          join(__dirname, '../tag.proto'),
        ],
      },
    },
  );
  await app.listen();
}
bootstrap();
