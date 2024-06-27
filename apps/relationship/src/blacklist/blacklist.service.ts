import {
  BlacklistDto,
  BlacklistWhereUnique,
} from '@app/common/types/blacklist';
import { Injectable } from '@nestjs/common';
import { GrpcNotFoundException } from 'nestjs-grpc-exceptions';
import { PrismaService } from '../prisma.service';

@Injectable()
export class BlacklistService {
  constructor(private readonly prismaService: PrismaService) {}

  async update(params: { data: BlacklistDto; where?: BlacklistWhereUnique }) {
    return this.prismaService.blacklist.upsert({
      create: params.data,
      update: params.data,
      where: params.where,
    });
  }

  async findOne(params: { where: BlacklistWhereUnique }) {
    const blacklist = await this.prismaService.blacklist.findUnique({
      where: params.where,
    });
    if (!blacklist) throw new GrpcNotFoundException('Blacklist not found');
    return blacklist;
  }
}
