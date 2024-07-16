import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PostServiceClient } from '@app/common/types/post';
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
    let type: NotificationType;
    switch (toStringKey) {
      case 'comment':
        type = NotificationType.COMMENT;
        break;
      case 'like':
        type = NotificationType.LIKE;
        break;
      case 'follow':
        type = NotificationType.FOLLOW;
        break;
      default:
        type = NotificationType.OTHER;
    }

    const toStringValue = value.toString();
    const parsedValue = JSON.parse(toStringValue);

    const payload = parsedValue;

    const post = await firstValueFrom(
      this.postService.findOne({ id: payload.postId }),
    );
    const interactor = await firstValueFrom(
      this.profileService.findOne({ userId: payload.userId }),
    );

    const data: UpsertNotificationDto = {
      type: type,
      post: {
        id: post.id,
        imageUrl: post.medias ? post.medias[0].url : '',
      },
      subject: {
        id: interactor.id,
        name: interactor.name,
        imageUrl: interactor.avatar,
      },
      userId: post.userId,
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
          { postId: upsertDto.post.id },
          { userId: upsertDto.userId },
        ],
      },
    });

    if (notification) {
      notification.subject.forEach((subject) => {
        if (subject == JSON.stringify(upsertDto.subject)) {
          return;
        }
      });
    }

    const data = {
      type: upsertDto.type.toString(),
      postId: upsertDto.post.id,
      post: JSON.stringify(upsertDto.post),
      userId: upsertDto.userId,
      content: 'content', // TODO: Implement content
      subject: notification
        ? notification.subject.push(JSON.stringify(upsertDto.subject))
        : [JSON.stringify(upsertDto.subject)],
      subjectCount: notification ? notification.subjectCount + 1 : 1,
      read: false,
    };

    if (notification && upsertDto.type != NotificationType.OTHER) {
      notification.subject.push(JSON.stringify(upsertDto.subject));
      const updated = await this.prismaService.notification.update({
        where: {
          id: notification.id,
        },
        data: {
          ...data,
          subject: notification.subject,
        },
      });
      this.eventEmitter.emit('notification.updated', updated);
    } else {
      const created = await this.prismaService.notification.create({
        data: {
          ...data,
          subject: [JSON.stringify(upsertDto.subject)],
        },
      });
      this.eventEmitter.emit('notification.created', created);
    }
  }
}
