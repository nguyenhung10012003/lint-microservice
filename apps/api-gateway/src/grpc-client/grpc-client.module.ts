import { RELATIONSHIP_PACKAGE_NAME } from '@app/common/types/following';
import { POST_PACKAGE_NAME } from '@app/common/types/media';
import { PROFILE_PACKAGE_NAME } from '@app/common/types/profile';
import { USER_PACKAGE_NAME } from '@app/common/types/user';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { MicroService } from './microservice';
import { INTERACTION_PACKAGE_NAME } from '@app/common/types/comment';
import { NOTIFICATION_PACKAGE_NAME } from '@app/common/types/notification';

const GrpcClients = ClientsModule.register([
  {
    name: MicroService.AUTH_SERVICE,
    transport: Transport.GRPC,
    options: {
      url: process.env.AUTH_URL || '127.0.0.1:5001',
      package: 'auth',
      protoPath: join(__dirname, '../auth/auth.proto'),
    },
  },
  {
    name: MicroService.USER_SERVICE,
    transport: Transport.GRPC,
    options: {
      url: process.env.USER_URL || '127.0.0.1:5000',
      package: [USER_PACKAGE_NAME, PROFILE_PACKAGE_NAME],
      protoPath: [
        join(__dirname, '../user/user.proto'),
        join(__dirname, '../user/profile.proto'),
      ],
    },
  },
  {
    name: MicroService.RELATIONSHIP_SERVICE,
    transport: Transport.GRPC,
    options: {
      url: process.env.RELATIONSHIP_URL || '127.0.0.1:5002',
      package: RELATIONSHIP_PACKAGE_NAME,
      protoPath: [
        join(__dirname, '../relationship/blacklist.proto'),
        join(__dirname, '../relationship/following.proto'),
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
        join(__dirname, '../post/post.proto'),
        join(__dirname, '../post/media.proto'),
        join(__dirname, '../post/tag.proto'),
      ],
    },
  },
  {
    name: MicroService.INTERACTION_SERVICE,
    transport: Transport.GRPC,
    options: {
      url: process.env.INTERACTION_URL,
      package: INTERACTION_PACKAGE_NAME,
      protoPath: [
        join(__dirname, '../interaction/comment.proto'),
        join(__dirname, '../interaction/like.proto'),
      ],
    },
  },
  {
    name: MicroService.NOTIFICATION_SERVICE,
    transport: Transport.GRPC,
    options: {
      url: process.env.NOTIFICATION_URL,
      package: NOTIFICATION_PACKAGE_NAME,
      protoPath: [join(__dirname, '../notification/notification.proto')],
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
