import { FollowDto } from '@app/common/types/following';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/prisma-relationship-client';
import { PrismaService } from '../prisma.service';
import { ProducerService } from '../kafka/provider.service';
import { NotificationPayload } from '@app/common/types/notification.payload';

@Injectable()
export class FollowingService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly producerService: ProducerService,
  ) {}
  async create(data: FollowDto) {
    const follow = await this.prismaService.follow.create({ data });

    const notificationPayload: NotificationPayload = {
      subjectId: data.followerId,
      diId: data.followingId,
    };

    this.producerService.produce({
      topic: 'notification',
      messages: [
        {
          key: 'follow',
          value: JSON.stringify(notificationPayload),
        },
      ],
    });

    return follow;
  }

  async delete(where: Prisma.followWhereUniqueInput) {
    return this.prismaService.follow.delete({ where });
  }

  async find(where: Prisma.followWhereInput, skip?: number, take?: number) {
    return {
      follows: await this.prismaService.follow.findMany({ where, skip, take }),
    };
  }

  async count(where: Prisma.followWhereInput): Promise<{ count: number }> {
    return {
      count: await this.prismaService.follow.count({ where }),
    };
  }
}
