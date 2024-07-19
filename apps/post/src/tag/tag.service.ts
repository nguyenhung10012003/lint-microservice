import { TagDto } from '@app/common/types/tag';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/prisma-post-client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TagService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: TagDto) {
    const tag = await this.prismaService.tag.create({ data });
    return {
      ...tag,
      createdAt: tag.createdAt.toISOString(),
    };
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    where?: Prisma.TagWhereInput;
    include?: Prisma.TagInclude;
    select?: Prisma.TagSelect;
    orderBy?: Prisma.TagOrderByWithAggregationInput;
  }) {
    const tags = await this.prismaService.tag.findMany(params);
    return {
      tags: tags.map((tag) => ({
        ...tag,
        createdAt: tag.createdAt.toISOString(),
      })),
    };
  }

  async findOne(where: Prisma.TagWhereUniqueInput) {
    const tag = await this.prismaService.tag.findUnique({ where });
    return {
      ...tag,
      createdAt: tag.createdAt.toISOString(),
    };
  }
}
