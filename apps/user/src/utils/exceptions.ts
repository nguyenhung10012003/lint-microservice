import { Prisma } from '@prisma/prisma-user-client';
import {
  GrpcAlreadyExistsException,
  GrpcInvalidArgumentException,
  GrpcUnknownException,
} from 'nestjs-grpc-exceptions';

export const prismaExceptionHandler = (
  error:
    | Prisma.PrismaClientKnownRequestError
    | Prisma.PrismaClientUnknownRequestError
    | Prisma.PrismaClientValidationError,
) => {
  if (error instanceof Prisma.PrismaClientUnknownRequestError)
    throw new GrpcUnknownException('Unknown prisma error');
  else if (error instanceof Prisma.PrismaClientValidationError) {
    throw new GrpcInvalidArgumentException('Invalid query data');
  }
  switch (error.code) {
    case 'P2002':
      throw new GrpcAlreadyExistsException('Duplicate key');
    default:
      throw new GrpcUnknownException('Unhandle prisma error');
  }
};

export const zodExceptionHandler = (error: Error) => {
  throw new GrpcInvalidArgumentException('Invalid input data');
};
