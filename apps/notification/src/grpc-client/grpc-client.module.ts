import { POST_PACKAGE_NAME } from '@app/common/types/media';
import { USER_PACKAGE_NAME } from '@app/common/types/user';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { MicroService } from './microservice';

const GrpcClients = ClientsModule.register([
  {
    name: MicroService.USER_SERVICE,
    transport: Transport.GRPC,
    options: {
      url: process.env.USER_URL,
      package: [USER_PACKAGE_NAME],
      protoPath: [
        join(__dirname, '../../user/user.proto'),
        join(__dirname, '../../user/profile.proto'),
      ],
    },
  },
  {
    name: MicroService.POST_SERVICE,
    transport: Transport.GRPC,
    options: {
      url: process.env.POST_URL,
      package: POST_PACKAGE_NAME,
      protoPath: [
        join(__dirname, '../../post/post.proto'),
        join(__dirname, '../../post/media.proto'),
        join(__dirname, '../../post/tag.proto'),
      ],
    },
  },
]);

@Module({
  imports: [GrpcClients],
  controllers: [],
  providers: [],
  exports: [GrpcClients],
})
export class GrpcClientModule {}
