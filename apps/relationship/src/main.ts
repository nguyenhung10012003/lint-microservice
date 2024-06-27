import { RELATIONSHIP_PACKAGE_NAME } from '@app/common/types/following';
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
        url: process.env.RELATIONSHIP_URL,
        package: RELATIONSHIP_PACKAGE_NAME,
        protoPath: [
          join(__dirname, '../following.proto'),
          join(__dirname, '../blacklist.proto'),
        ],
      },
    },
  );
  await app.listen();
}
bootstrap();
