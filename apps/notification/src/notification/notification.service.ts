import {
  BadRequestException,
  Inject,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Post, PostServiceClient } from '@app/common/types/post';
import { MicroService } from '../grpc-client/microservice';
import { ClientGrpc } from '@nestjs/microservices';
import { ConsumerService } from '../kafka/consumer.service';
import {
  UpsertNotificationDto,
  NotificationType,
  UpdateStatusDto,
  NotificationFindParams,
  Notifications,
  NotificationWhereUnique,
} from '@app/common/types/notification';
import {
  PROFILE_SERVICE_NAME,
  ProfileServiceClient,
} from '@app/common/types/profile';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { firstValueFrom } from 'rxjs';

import { NotificationPayload } from '@app/common/types/notification.payload';
import {
  generateNotificationContent,
  generateUrl,
  getFirstWords,
  getNotificationType,
} from './helper/helper';
import { MediaType } from '@app/common/types/media';

@Injectable()
export class NotificationService implements OnModuleInit {
  private profileService: ProfileServiceClient;
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
    this.profileService =
      this.userClient.getService<ProfileServiceClient>(PROFILE_SERVICE_NAME);
    this.postService =
      this.postClient.getService<PostServiceClient>('PostService');

    await this.consumerService.consume(
      { topics: ['notification'] },
      {
        eachMessage: async ({ message }) => {
          const { key, value } = message;
          try {
            await this.handleNotification(key, value);
          } catch (error) {
            console.error(error);
          }
        },
      },
    );
  }

  async handleNotification(key: Buffer, value: Buffer) {
    const toStringKey = key.toString();
    const type: NotificationType = getNotificationType(toStringKey);

    const toStringValue = value.toString();
    const parsedValue = JSON.parse(toStringValue);
    const payload: NotificationPayload = parsedValue;

    const subject = await firstValueFrom(
      this.profileService.findOne({ userId: payload.subjectId }),
    );

    if (!subject) {
      throw new BadRequestException('Subject not found');
    }

    let post: Post;
    if (payload.postId) {
      post = await firstValueFrom(
        this.postService.findOne({ id: payload.postId }),
      );
    }

    let data: UpsertNotificationDto;
    switch (type) {
      case NotificationType.COMMENT:
        data = {
          type: type,
          // comment
          diObject: {
            id: payload.diId,
            name: payload.diName ? getFirstWords(payload.diName, 5) : '',
          },
          subject: {
            id: subject.id,
            name: subject.name,
            imageUrl: subject.avatar,
          },
          url: generateUrl(type, payload.diId),
          userId: post.userId,
          postId: post.id,
        };
        break;
      case NotificationType.LIKE:
        data = {
          type: type,
          // post
          diObject: {
            id: post.id,
            name: post.content ? getFirstWords(post.content, 5) : '',
            imageUrl: post.medias
              ? post.medias[0].type === MediaType.IMAGE
                ? post.medias[0].url
                : null
              : null,
          },
          subject: {
            id: subject.id,
            name: subject.name,
            imageUrl: subject.avatar,
          },
          url: generateUrl(type, post.id),
          userId: post.userId,
          postId: post.id,
        };
        break;
      case NotificationType.FOLLOW:
        data = {
          type: type,
          // following
          diObject: {
            id: subject.id,
            name: subject.name,
            imageUrl: subject.avatar,
          },
          // follower
          subject: {
            id: subject.id,
            name: subject.name,
            imageUrl: subject.avatar,
          },
          url: generateUrl(type, subject.id),
          userId: subject.id,
          postId: null,
        };
        break;
    }
    await this.upsert(data);
  }

  async upsert(upsertDto: UpsertNotificationDto) {
    let notification = null;

    if (upsertDto.postId) {
      notification = await this.prismaService.notification.findFirst({
        where: {
          AND: [
            {
              type: upsertDto.type.toString(),
            },
            { postId: upsertDto.postId },
            { userId: upsertDto.userId },
          ],
        },
      });
    }

    // only add subject or increase subject count if subject is not exist
    let updateSubject = true;
    if (notification) {
      for (const subject of notification.subjects) {
        if (subject.id === upsertDto.subject.id) {
          updateSubject = false;
        }
      }
    }

    const subjectCount = notification
      ? notification.subjectCount + updateSubject
      : 1;
    const content = generateNotificationContent(
      upsertDto.subject.name,
      subjectCount,
      upsertDto.type,
      upsertDto.diObject.name,
    );

    const data = {
      type: upsertDto.type.toString(),
      postId: upsertDto.postId,
      diObject: upsertDto.diObject,
      userId: upsertDto.userId,
      content: JSON.stringify(content),
      subjects: notification
        ? updateSubject
          ? [...notification.subjects, upsertDto.subject]
          : notification.subjects
        : [upsertDto.subject],
      subjectCount: subjectCount,
      url: upsertDto.url,
      read: false,
      lastModified: new Date().toISOString(),
    };

    let upsertNoti = null;
    let notificationType = ''; // update or create
    if (notification) {
      notificationType = 'update';
      upsertNoti = await this.prismaService.notification.update({
        where: {
          id: notification.id,
        },
        data: {
          ...data,
        },
      });
    } else {
      notificationType = 'new';
      upsertNoti = await this.prismaService.notification.create({
        data: data,
      });
    }

    const lastSubject = upsertNoti.subjects[upsertNoti.subjects.length - 1];

    const unreadCount = await this.prismaService.notification.count({
      where: {
        userId: upsertDto.userId,
        read: false,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { subjects, subjectCount: _, ...rest } = upsertNoti;
    this.eventEmitter.emit('notification', {
      notificationType,
      ...rest,
      lastSubject,
      unreadCount,
    });
  }

  async delete(where: NotificationWhereUnique) {
    const isExist = await this.prismaService.notification.findUnique({
      where: {
        id: where.id,
      },
    });

    if (!isExist || isExist.userId !== where.userId) {
      throw new BadRequestException('Notification not found');
    }

    return {
      notifications: await this.prismaService.notification.findMany({
        where: {
          id: where.id,
        },
      }),
    };
  }

  async updateStatus(updateStatusDto: UpdateStatusDto) {
    const existNoti = await this.prismaService.notification.findUnique({
      where: {
        id: updateStatusDto.id,
      },
    });
    if (!existNoti || existNoti.userId !== updateStatusDto.userId) {
      throw new BadRequestException('Notification not found');
    }

    await this.prismaService.notification.update({
      where: { id: updateStatusDto.id },
      data: { read: updateStatusDto.read },
    });
  }

  async findMany(param: NotificationFindParams): Promise<Notifications> {
    const notifications = await this.prismaService.notification.findMany({
      where: {
        userId: param.where.userId,
      },
      skip: param.skip,
      take: param.take,
      orderBy: {
        createdAt: param.orderBy == 'asc' ? 'asc' : 'desc',
      },
    });

    const totalNotifications = await this.prismaService.notification.count({
      where: {
        userId: param.where.userId,
      },
    });

    const hasMore = param.skip + param.take < totalNotifications;

    return {
      notifications: notifications.map((notification) => {
        return {
          id: notification.id,
          userId: notification.userId,
          content: JSON.parse(notification.content.toString()),
          diObject: notification.diObject,
          subject: notification.subjects[notification.subjects.length - 1],
          url: notification.url,
          read: notification.read,
          lastModified: notification.lastModified.toISOString(),
        };
      }),
      hasMore: hasMore,
    };
  }

  async countUnread(userId: { userId: string }) {
    const unreadCount = await this.prismaService.notification.count({
      where: {
        userId: userId.userId,
        read: false,
      },
    });

    return {
      count: unreadCount,
    };
  }
}
