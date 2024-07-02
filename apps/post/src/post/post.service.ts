import { PostDto, PostScope } from '@app/common/types/post';
import { Injectable } from '@nestjs/common';
import { $Enums, Prisma } from '@prisma/prisma-post-client';
import { MediaBuilder } from '../media/model/media.factory';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: PostDto) {
    const post = await this.prisma.post.create({
      data: {
        ...data,
        scope:
          data.scope === PostScope.PUBLIC
            ? $Enums.PostScope.PUBLIC
            : $Enums.PostScope.PRIVATE,
        medias: {
          create: data.medias?.map((media) => {
            return new MediaBuilder()
              .setUrl(media.url)
              .setType(media.type)
              .setWidth(media.width)
              .setHeight(media.height)
              .setDuration(media.duration)
              .build();
          }),
        },
        tags: {
          create: data.tags?.map((tag) => {
            return { name: tag.name };
          }),
        },
      },
    });
    return {
      ...post,
      scope:
        post.scope === $Enums.PostScope.PUBLIC
          ? PostScope.PUBLIC
          : PostScope.PRIVATE,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    };
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    where?: Prisma.PostWhereInput;
    include?: Prisma.PostInclude;
    select?: Prisma.PostSelect;
  }) {
    const posts = await this.prisma.post.findMany(params);
    return {
      posts: posts.map((post) => {
        return {
          ...post,
          scope:
            post.scope === $Enums.PostScope.PUBLIC
              ? PostScope.PUBLIC
              : PostScope.PRIVATE,
          createdAt: post.createdAt?.toISOString(),
          updatedAt: post.updatedAt?.toISOString(),
        };
      }),
    };
  }
}
