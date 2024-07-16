import { LikeDto } from '@app/common/types/like';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/prisma-interaction-client';
import { PrismaService } from '../prisma.service';
import { ProducerService } from '../kafka/producer.service';

@Injectable()
export class LikeService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly producerService: ProducerService,
  ) {}
  async create(like: LikeDto) {
    const newLike = await this.prismaService.like.create({ data: like });
    await this.producerService.produce({
      topic: 'notification',
      messages: [
        {
          key: 'like',
          value: JSON.stringify(newLike),
        },
      ],
    });
    return {
      ...newLike,
      createdAt: newLike.createdAt?.toISOString(),
    };
  }

  async delete(where: Prisma.LikeWhereUniqueInput) {
    const like = await this.prismaService.like.delete({ where });
    return {
      ...like,
      createdAt: like.createdAt?.toISOString(),
    };
  }

  async find(params: Prisma.LikeFindManyArgs) {
    const likes = await this.prismaService.like.findMany(params);
    return {
      likes: likes.map((like) => {
        return {
          ...like,
          createdAt: like.createdAt?.toISOString(),
        };
      }),
    };
  }

  async count(where: Prisma.LikeWhereInput) {
    return {
      count: await this.prismaService.like.count({ where }),
    };
  }
}
