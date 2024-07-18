// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.180.0
//   protoc               v5.27.2
// source: notification.proto

/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "notification";

export enum NotificationType {
  OTHER = 0,
  LIKE = 1,
  COMMENT = 2,
  FOLLOW = 3,
  UNRECOGNIZED = -1,
}

export interface UpsertNotificationDto {
  type: NotificationType;
  diObject?: Obj | undefined;
  subject: Obj | undefined;
  userId?: string | undefined;
  postId?: string | undefined;
  url: string;
}

export interface UpdateStatusDto {
  id: string;
  userId?: string | undefined;
  read: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  diObject?: Obj | undefined;
  subject: Obj | undefined;
  url: string;
  content: Content | undefined;
  read: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Obj {
  id: string;
  name?: string | undefined;
  imageUrl?: string | undefined;
}

export interface Content {
  text: string;
  highlights: Highlight[];
}

export interface Highlight {
  length: number;
  offset: number;
}

export interface Notifications {
  notifications: Notification[];
}

export interface NotificationWhereUnique {
  id: string;
  userId?: string | undefined;
}

export interface NotificationWhere {
  userId: string;
}

export interface NotificationFindParams {
  where: NotificationWhere | undefined;
  skip?: number | undefined;
  take?: number | undefined;
  orderBy?: string | undefined;
}

export interface Empty {
}

export const NOTIFICATION_PACKAGE_NAME = "notification";

export interface NotificationServiceClient {
  updateStatus(request: UpdateStatusDto): Observable<Empty>;

  findMany(request: NotificationFindParams): Observable<Notifications>;

  delete(request: NotificationWhereUnique): Observable<Empty>;
}

export interface NotificationServiceController {
  updateStatus(request: UpdateStatusDto): Promise<Empty> | Observable<Empty> | Empty;

  findMany(request: NotificationFindParams): Promise<Notifications> | Observable<Notifications> | Notifications;

  delete(request: NotificationWhereUnique): Promise<Empty> | Observable<Empty> | Empty;
}

export function NotificationServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["updateStatus", "findMany", "delete"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("NotificationService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("NotificationService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const NOTIFICATION_SERVICE_NAME = "NotificationService";
