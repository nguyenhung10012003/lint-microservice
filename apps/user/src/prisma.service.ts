import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/prisma-user-client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super();
    this.$extends({
      client: {
        log: [
          {
            emit: 'event',
            level: 'query',
          },
          {
            emit: 'stdout',
            level: 'error',
          },
          {
            emit: 'stdout',
            level: 'info',
          },
          {
            emit: 'stdout',
            level: 'warn',
          },
        ],
      },
    });
  }
  async onModuleInit() {
    await this.$connect();
  }
}
