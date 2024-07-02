// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.180.0
//   protoc               v5.26.0
// source: following.proto

/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export const protobufPackage = 'relationship';

export interface FollowDto {
  followerId: string;
  followingId: string;
}

export interface Follow {
  id: string;
  followerId: string;
  followingId: string;
}

export interface Follows {
  follows: Follow[];
}

export interface Count {
  count: number;
}

export interface FollowWhereUnique {
  id: string;
  followerId?: string | undefined;
  followingId?: string | undefined;
  and?: FollowWhere[];
}

export interface FollowWhere {
  id?: string | undefined;
  followerId?: string | undefined;
  followingId?: string | undefined;
  and?: FollowWhere[];
}

export const RELATIONSHIP_PACKAGE_NAME = 'relationship';

export interface FollowingServiceClient {
  create(request: FollowDto): Observable<Follow>;

  delete(request: FollowWhereUnique): Observable<Follow>;

  find(request: FollowWhere): Observable<Follows>;

  count(request: FollowWhere): Observable<Count>;
}

export interface FollowingServiceController {
  create(request: FollowDto): Promise<Follow> | Observable<Follow> | Follow;

  delete(
    request: FollowWhereUnique,
  ): Promise<Follow> | Observable<Follow> | Follow;

  find(request: FollowWhere): Promise<Follows> | Observable<Follows> | Follows;

  count(request: FollowWhere): Promise<Count> | Observable<Count> | Count;
}

export function FollowingServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['create', 'delete', 'find', 'count'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('FollowingService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('FollowingService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const FOLLOWING_SERVICE_NAME = 'FollowingService';