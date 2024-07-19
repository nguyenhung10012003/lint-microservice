import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Prisma } from '@prisma/prisma-user-client';
import { GrpcUnknownException } from 'nestjs-grpc-exceptions';
import { Observable, catchError } from 'rxjs';
import { ZodError } from 'zod';
import {
  prismaExceptionHandler,
  zodExceptionHandler,
} from '../utils/exceptions';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error: Error) => {
        console.log(error);
        if (
          error instanceof Prisma.PrismaClientKnownRequestError ||
          error instanceof Prisma.PrismaClientUnknownRequestError ||
          error instanceof Prisma.PrismaClientValidationError
        ) {
          prismaExceptionHandler(error);
        } else if (error instanceof ZodError) {
          zodExceptionHandler(error);
        }
        throw new GrpcUnknownException(error.message);
      }),
    );
  }
}
