import { UsersMessage } from '@app/common/types/user';
import { hashPassword } from '@app/common/utils/hashing';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/prisma-user-client';
import { PrismaService } from '../prisma.service';
import { UserCreateInput } from './model/user.input';
import { UserModel } from './model/user.model';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithAggregationInput;
    select?: Prisma.UserSelect;
    include?: Prisma.UserInclude;
  }): Promise<UsersMessage> {
    const users: UserModel[] = await this.prismaService.user.findMany(params);
    return {
      users: users.map((user) => {
        return {
          ...user,
          createdAt: user.createdAt?.toISOString(),
          updatedAt: user.updatedAt?.toISOString(),
          profile: {
            ...user.profile,
            dob: user.profile?.dob?.toISOString(),
          },
        };
      }),
    };
  }

  async findById(id: string, include?: Prisma.UserInclude) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
      include: include,
    });
    return {
      ...user,
      createdAt: user?.createdAt.toISOString(),
      updatedAt: user?.updatedAt.toISOString(),
      profile: {
        ...user?.profile,
        dob: user?.profile?.dob?.toISOString(),
      },
    };
  }

  async findOne(
    data: Prisma.UserWhereUniqueInput,
    include?: Prisma.UserInclude,
  ) {
    const user = await this.prismaService.user.findUnique({
      where: data,
      include: include,
    });

    return {
      ...user,
      createdAt: user?.createdAt.toISOString(),
      updatedAt: user?.updatedAt.toISOString(),
      profile: {
        ...user?.profile,
        dob: user?.profile?.dob?.toISOString(),
      },
    };
  }

  async create(data: Prisma.UserCreateInput) {
    UserCreateInput.parse(data);
    const user = await this.prismaService.user.create({
      data: {
        email: data.email,
        password: await hashPassword(data.password),
      },
    });

    return {
      ...user,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };
  }

  async update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }) {
    const user = await this.prismaService.user.update({
      where: params.where,
      data: params.data,
    });

    return {
      ...user,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };
  }

  async search(params: { key?: string; skip?: number; take?: number }) {
    const result: { id: string }[] = await this.prismaService
      .$queryRaw`SELECT User.id FROM User JOIN Profile ON User.id = Profile.userId ORDER BY levenshtein(${params.key}, name) LIMIT ${params.take || 10} OFFSET ${params.skip || 0}`;
    return {
      usersId: result,
    };
  }
}
