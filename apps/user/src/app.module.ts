import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { GrpcServerExceptionFilter } from 'nestjs-grpc-exceptions';
import ProfileModule from './profile/profile.module';
import { UserModule } from './user/user.module';

const grpcProvider = {
  provide: APP_FILTER,
  useClass: GrpcServerExceptionFilter,
};

@Module({
  imports: [UserModule, ProfileModule],
  controllers: [],
  providers: [grpcProvider],
})
export class AppModule {}
