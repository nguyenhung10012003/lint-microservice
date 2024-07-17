import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateNotificationDto,
  UpdateNotificationDto,
  Notification,
  NotificationFindParams,
  Notifications,
  NotificationWhereUnique,
} from '@app/common/types/notification';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { GrpcNotFoundException } from 'nestjs-grpc-exceptions';

@Injectable()
export class NotificationService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(notification: CreateNotificationDto): Promise<Notification> {
    const newNotification = await this.prismaService.notification.create({
      data: { ...notification, read: false },
    });
    console.log('newNotification', newNotification);
    this.eventEmitter.emit('send-notification', newNotification);
    return {
      ...newNotification,
      createdAt: newNotification.createdAt?.toISOString(),
      updatedAt: newNotification.updatedAt?.toISOString(),
    };
  }

  async findMany(params: NotificationFindParams): Promise<Notifications> {
    const notifications = await this.prismaService.notification.findMany({
      where: params.where,
      skip: params.skip,
      take: params.take,
      orderBy: {
        createdAt: params.orderBy == 'asc' ? 'asc' : 'desc',
      },
    });
    return {
      notifications: notifications.map((notification) => {
        return {
          ...notification,
          createdAt: notification.createdAt?.toISOString(),
          updatedAt: notification.updatedAt?.toISOString(),
        };
      }),
    };
  }

  async update(updateDto: UpdateNotificationDto): Promise<Notification> {
    let notification = await this.prismaService.notification.findUnique({
      where: {
        id: updateDto.id,
      },
    });
    if (!notification) {
      throw new GrpcNotFoundException('Notification not found');
    }
    notification = await this.prismaService.notification.update({
      where: {
        id: updateDto.id,
      },
      data: {
        read: updateDto.read,
      },
    });

    return {
      ...notification,
      createdAt: notification.createdAt?.toISOString(),
      updatedAt: notification.updatedAt?.toISOString(),
    };
  }

  async delete(where: NotificationWhereUnique): Promise<void> {
    const isNotificationExist = await this.prismaService.notification.count({
      where: { id: where.id },
    });
    if (!isNotificationExist) {
      throw new GrpcNotFoundException('Notification not found');
    }

    await this.prismaService.notification.delete({ where });
    return;
  }

  async findOne(where: NotificationWhereUnique): Promise<Notification> {
    const notification = await this.prismaService.notification.findUnique({
      where,
    });
    if (!notification) {
      throw new GrpcNotFoundException('Notification not found');
    }

    return {
      ...notification,
      createdAt: notification.createdAt?.toISOString(),
      updatedAt: notification.updatedAt?.toISOString(),
    };
  }
}
