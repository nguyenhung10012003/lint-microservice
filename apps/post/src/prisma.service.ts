import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/prisma-post-client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super();
    this.$extends({
      result: {
        post: {
          share: {
            needs: { id: true },
            compute(post) {
              return () => this.post.count({ where: { sourceId: post.id } });
            },
          },
        },
      },
    });
  }
  async onModuleInit() {
    await this.$connect();
  }
}
