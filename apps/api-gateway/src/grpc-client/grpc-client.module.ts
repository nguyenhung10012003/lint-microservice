import { AUTH_PACKAGE_NAME } from '@app/common/types/auth';
import { PROFILE_PACKAGE_NAME } from '@app/common/types/profile';
import { USER_PACKAGE_NAME } from '@app/common/types/user';
import { credentials } from '@grpc/grpc-js';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

const GrpcClients = ClientsModule.register([
  {
    name: AUTH_PACKAGE_NAME,
    transport: Transport.GRPC,
    options: {
      url: process.env.AUTH_URL || '127.0.0.1:5001',
      package: 'auth',
      protoPath: join(__dirname, '../auth/auth.proto'),
    },
  },
  {
    name: PROFILE_PACKAGE_NAME,
    transport: Transport.GRPC,
    options: {
      package: 'profile',
      protoPath: join(__dirname, '../user/profile.proto'),
    },
  },
  {
    name: USER_PACKAGE_NAME,
    transport: Transport.GRPC,
    options: {
      package: 'user',
      protoPath: join(__dirname, '../user/user.proto'),
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
