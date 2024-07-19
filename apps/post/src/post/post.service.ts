import { MediaType } from '@app/common/types/media';
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
          connect: data.tags?.map((tag) => {
            return { name: tag.name };
          }),
        },
      },
      include: {
        medias: true,
        tags: true,
      },
    });
    return {
      ...post,
      medias: post.medias.map((media) => {
        return {
          ...media,
          type: MediaType[media.type as keyof typeof MediaType],
        };
      }),
      tags: post.tags.map((tag) => {
        return {
          ...tag,
          createdAt: tag.createdAt.toISOString(),
        };
      }),
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

    select?: Prisma.PostSelect;
    orderBy?: Prisma.PostOrderByWithAggregationInput;
  }) {
    const posts = await this.prisma.post.findMany({
      ...params,
      include: { medias: true, tags: true },
    });
    return {
      posts: posts.map((post) => {
        return {
          ...post,
          sourcePost: post.sourcePost
            ? {
                ...post.sourcePost,
                scope:
                  PostScope[post.sourcePost.scope as keyof typeof PostScope],
                createdAt: post.sourcePost.createdAt?.toISOString(),
                updatedAt: post.sourcePost.updatedAt?.toISOString(),
              }
            : undefined,
          medias: post.medias.map((media) => {
            return {
              ...media,
              type: MediaType[media.type as keyof typeof MediaType],
            };
          }),
          tags: post.tags.map((tag) => {
            return {
              ...tag,
              createdAt: tag.createdAt.toISOString(),
            };
          }),
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

  async findOne(where: Prisma.PostWhereUniqueInput) {
    const post = await this.prisma.post.findUnique({
      where,
      include: { medias: true, tags: true },
    });
    return {
      ...post,
      medias: post.medias.map((media) => {
        return {
          ...media,
          type: MediaType[media.type as keyof typeof MediaType],
        };
      }),
      tags: post.tags.map((tag) => {
        return {
          ...tag,
          createdAt: tag.createdAt.toISOString(),
        };
      }),
      scope:
        post.scope === $Enums.PostScope.PUBLIC
          ? PostScope.PUBLIC
          : PostScope.PRIVATE,
      createdAt: post.createdAt?.toISOString(),
      updatedAt: post.updatedAt?.toISOString(),
    };
  }
}
