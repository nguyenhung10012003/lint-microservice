import { FollowDto } from '@app/common/types/following';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/prisma-relationship-client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class FollowingService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(data: FollowDto) {
    return this.prismaService.follow.create({ data });
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
