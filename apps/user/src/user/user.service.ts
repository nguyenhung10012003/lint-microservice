import { UsersMessage } from '@app/common/types/user';
import { hashPassword } from '@app/common/utils/hashing';
import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/prisma-user-client';
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
          createdAt: user.createdAt?.getTime(),
          updatedAt: user.updatedAt?.getTime(),
          profile: {
            ...user.profile,
            dob: user.profile?.dob?.getTime(),
          },
        };
      }),
    };
  }

  async findById(id: string): Promise<User> {
    return this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findOne(data: Prisma.UserWhereUniqueInput) {
    const user = await this.prismaService.user.findUnique({
      where: data,
    });

    return {
      ...user,
      createdAt: user?.createdAt.getTime(),
      updatedAt: user?.updatedAt.getTime(),
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
      createdAt: user.createdAt.getTime(),
      updatedAt: user.updatedAt.getTime(),
    };
  }
}
