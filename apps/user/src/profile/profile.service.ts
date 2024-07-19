import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/prisma-user-client';
import { PrismaService } from '../prisma.service';
import { ProfileCreateInput } from './model/profile.input';

@Injectable()
export class ProfileService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProfileWhereUniqueInput;
    where?: Prisma.ProfileWhereInput;
    orderBy?: Prisma.ProfileOrderByWithAggregationInput;
    select?: Prisma.ProfileSelect;
    include?: Prisma.ProfileInclude;
  }) {
    const profiles = await this.prismaService.profile.findMany(params);
    return {
      profiles: profiles.map((profile) => {
        return {
          ...profile,
          dob: profile.dob?.toISOString(),
        };
      }),
    };
  }

  async findOne(userId: string) {
    const profile = await this.prismaService.profile.findUnique({
      where: {
        userId: userId,
      },
    });
    return {
      id: profile.id,
      name: profile.name,
      avatar: profile.avatar,
    };
  }

  async findById(id: string) {
    const profile = await this.prismaService.profile.findUnique({
      where: {
        id,
      },
    });
    return {
      ...profile,
      dob: profile?.dob?.toISOString(),
    };
  }

  async findByUserId(userId: string) {
    const profile = await this.prismaService.profile.findFirst({
      where: {
        userId,
      },
    });
    return {
      ...profile,
      dob: profile?.dob?.toISOString(),
    };
  }

  async create(data: Prisma.ProfileUncheckedCreateInput) {
    ProfileCreateInput.parse(data);
    const profile = await this.prismaService.profile.create({
      data,
    });
    return {
      ...profile,
      dob: profile.dob?.toISOString(),
    };
  }

  async update(params: {
    where: Prisma.ProfileWhereUniqueInput;
    data: Prisma.ProfileUpdateInput;
  }) {
    const profile = await this.prismaService.profile.update(params);
    return {
      ...profile,
      dob: profile.dob?.toISOString(),
    };
  }
}
