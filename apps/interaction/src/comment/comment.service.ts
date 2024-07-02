import { CommentDto } from '@app/common/types/comment';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/prisma-interaction-client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CommentService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(comment: CommentDto) {
    const newComment = await this.prismaService.comment.create({
      data: comment,
    });
    return {
      ...newComment,
      createdAt: newComment.createdAt?.toISOString(),
      updatedAt: newComment.updatedAt?.toISOString(),
    };
  }

  async delete(where: Prisma.CommentWhereUniqueInput) {
    const comment = await this.prismaService.comment.delete({ where });
    return {
      ...comment,
      createdAt: comment.createdAt?.toISOString(),
      updatedAt: comment.updatedAt?.toISOString(),
    };
  }

  async find(params: Prisma.CommentFindManyArgs) {
    const comments = await this.prismaService.comment.findMany(params);
    return {
      comments: comments.map((comment) => {
        return {
          ...comment,
          createdAt: comment.createdAt?.toISOString(),
          updatedAt: comment.updatedAt?.toISOString(),
        };
      }),
    };
  }

  async findOne(where: Prisma.CommentWhereUniqueInput) {
    const comment = await this.prismaService.comment.findUnique({ where });
    return {
      ...comment,
      createdAt: comment.createdAt?.toISOString(),
      updatedAt: comment.updatedAt?.toISOString(),
    };
  }

  async count(where: Prisma.CommentWhereInput) {
    return {
      count: await this.prismaService.comment.count({ where }),
    };
  }

  async update(
    where: Prisma.CommentWhereUniqueInput,
    data: Prisma.CommentUpdateInput,
  ) {
    const comment = await this.prismaService.comment.update({ where, data });
    return {
      ...comment,
      createdAt: comment.createdAt?.toISOString(),
      updatedAt: comment.updatedAt?.toISOString(),
    };
  }
}
