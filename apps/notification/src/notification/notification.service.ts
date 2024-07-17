import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Post, PostServiceClient } from '@app/common/types/post';
import { MicroService } from '../grpc-client/microservice';
import { ClientGrpc } from '@nestjs/microservices';
import { ConsumerService } from '../kafka/consumer.service';
import {
  UpsertNotificationDto,
  NotificationType,
} from '@app/common/types/notification';
import {
  PROFILE_SERVICE_NAME,
  ProfileServiceClient,
} from '@app/common/types/profile';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { firstValueFrom } from 'rxjs';
import { generateNotificationContent } from './helper/generateContent';
import { getFirstWords } from './helper/getFirstWord';
import { NotificationPayload } from '@app/common/types/notification.payload';

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
    const type: NotificationType = this.getNotificationType(toStringKey);

    const toStringValue = value.toString();
    const parsedValue = JSON.parse(toStringValue);
    const payload: NotificationPayload = parsedValue;

    const subject = await firstValueFrom(
      this.profileService.findOne({ userId: payload.subjectId }),
    );

    let post: Post;

    if (payload.postId) {
      post = await firstValueFrom(
        this.postService.findOne({ id: payload.postId }),
      );
    }

    const data: UpsertNotificationDto = {
      type: type,
      diObject: {
        id: payload.diId,
        name: payload.diName ? getFirstWords(payload.diName, 5) : '',
        imageUrl: payload.diUrl ? payload.diUrl : null,
      },
      subject: {
        id: subject.id,
        name: subject.name,
        imageUrl: subject.avatar,
      },
      // if post is null, it is a follow/other
      userId: post ? post.userId : payload.diId,
      postId: post ? post.id : null,
    };
    await this.upsert(data);
  }

  async upsert(upsertDto: UpsertNotificationDto) {
    const notification = await this.prismaService.notification.findFirst({
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

    if (notification) {
      notification.subjects.forEach((subject) => {
        if (subject == JSON.stringify(upsertDto.subject)) {
          return;
        }
      });
    }

    const subjectCount = notification ? notification.subjectCount + 1 : 1;
    const content = generateNotificationContent(
      upsertDto.subject.name,
      subjectCount,
      upsertDto.type,
      upsertDto.diObject.name,
    );

    const data = {
      type: upsertDto.type.toString(),
      postId: upsertDto.postId,
      diObject: JSON.stringify(upsertDto.diObject),
      userId: upsertDto.userId,
      content: JSON.stringify(content),
      subjects: notification
        ? notification.subjects.push(JSON.stringify(upsertDto.subject))
        : [JSON.stringify(upsertDto.subject)],
      subjectCount: subjectCount,
      read: false,
    };

    if (
      notification &&
      (upsertDto.type == NotificationType.COMMENT ||
        upsertDto.type == NotificationType.LIKE)
    ) {
      notification.subjects.push(JSON.stringify(upsertDto.subject));
      const updated = await this.prismaService.notification.update({
        where: {
          id: notification.id,
        },
        data: {
          ...data,
          subjects: notification.subjects,
        },
      });
      this.eventEmitter.emit('notification.updated', updated);
    } else {
      const created = await this.prismaService.notification.create({
        data: {
          ...data,
          subjects: [JSON.stringify(upsertDto.subject)],
        },
      });
      this.eventEmitter.emit('notification.created', created);
    }
  }

  getNotificationType(stringKey: string): NotificationType {
    switch (stringKey) {
      case 'comment':
        return NotificationType.COMMENT;
      case 'like':
        return NotificationType.LIKE;
      case 'follow':
        return NotificationType.FOLLOW;
      default:
        return NotificationType.OTHER;
    }
  }
}
