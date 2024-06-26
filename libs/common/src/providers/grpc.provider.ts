import { APP_FILTER } from '@nestjs/core';
import { GrpcServerExceptionFilter } from 'nestjs-grpc-exceptions';

export const grpcProvider = {
  provide: APP_FILTER,
  useClass: GrpcServerExceptionFilter,
};
