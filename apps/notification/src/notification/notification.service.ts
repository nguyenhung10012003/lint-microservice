import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserServiceClient } from '@app/common/types/user';
import { PostServiceClient } from '@app/common/types/post';
import { MicroService } from '../grpc-client/microservice';
import { ClientGrpc } from '@nestjs/microservices';
import { ConsumerService } from '../kafka/consumer.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class NotificationService implements OnModuleInit {
  private userService: UserServiceClient;
  private postService: PostServiceClient;

  constructor(
    private prismaService: PrismaService,
    @Inject(MicroService.USER_SERVICE)
    private readonly userClient: ClientGrpc,
    @Inject(MicroService.POST_SERVICE)
    private readonly postClient: ClientGrpc,
    private readonly consumerService: ConsumerService,
    private eventEmitter: EventEmitter2,
  ) {}

  async onModuleInit() {
    this.userService =
      this.userClient.getService<UserServiceClient>('UserService');
    this.postService =
      this.postClient.getService<PostServiceClient>('PostService');

    await this.consumerService.consume(
      { topics: ['notification'] },
      {
        eachMessage: async ({ topic, partition, message }) => {
          console.log({
            value: message.value.toString(),
          });
        },
      },
    );
  }

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
