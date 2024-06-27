import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import {
  GrpcInvalidArgumentException,
  GrpcUnknownException,
} from 'nestjs-grpc-exceptions';
import { Observable, catchError, throwError } from 'rxjs';
import { ZodError } from 'zod';
import { ERROR_TO_GRPC } from '../utils/exceptions';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error: Error) => {
        console.log(error);
        if (error instanceof ZodError) {
          return throwError(
            () => new GrpcInvalidArgumentException('Invalid input'),
          );
        } else if (error.hasOwnProperty('code')) {
          return throwError(() => ERROR_TO_GRPC[error['code']]);
        } else if (error instanceof RpcException) {
          return throwError(() => error);
        }
        throw new GrpcUnknownException(error.message);
      }),
    );
  }
}
