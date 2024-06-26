import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { GrpcUnknownException } from 'nestjs-grpc-exceptions';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error: Error) => {
        console.log(error);
        if (error instanceof RpcException) {
          return throwError(() => error);
        }
        return throwError(() => new GrpcUnknownException(error.message));
      }),
    );
  }
}
