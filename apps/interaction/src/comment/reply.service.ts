import { ReplyDto } from '@app/common/types/comment';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/prisma-interaction-client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ReplyService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(reply: ReplyDto) {
    const newReply = await this.prismaService.reply.create({
      data: reply,
    });
    return {
      ...newReply,
      createdAt: newReply.createdAt?.toISOString(),
      updatedAt: newReply.updatedAt?.toISOString(),
    };
  }

  async delete(where: Prisma.ReplyWhereUniqueInput) {
    const reply = await this.prismaService.reply.delete({ where });
    return {
      ...reply,
      createdAt: reply.createdAt?.toISOString(),
      updatedAt: reply.updatedAt?.toISOString(),
    };
  }

  async find(params: Prisma.ReplyFindManyArgs) {
    const replies = await this.prismaService.reply.findMany(params);
    return {
      replies: replies.map((reply) => {
        return {
          ...reply,
          createdAt: reply.createdAt?.toISOString(),
          updatedAt: reply.updatedAt?.toISOString(),
        };
      }),
    };
  }

  async findOne(where: Prisma.ReplyWhereUniqueInput) {
    const reply = await this.prismaService.reply.findUnique({ where });
    return {
      ...reply,
      createdAt: reply.createdAt?.toISOString(),
      updatedAt: reply.updatedAt?.toISOString(),
    };
  }

  async count(where: Prisma.ReplyWhereInput) {
    return {
      count: await this.prismaService.reply.count({ where }),
    };
  }

  async update(
    where: Prisma.ReplyWhereUniqueInput,
    data: Prisma.ReplyUpdateInput,
  ) {
    const updatedReply = await this.prismaService.reply.update({
      where,
      data,
    });
    return {
      ...updatedReply,
      createdAt: updatedReply.createdAt?.toISOString(),
      updatedAt: updatedReply.updatedAt?.toISOString(),
    };
  }
}
