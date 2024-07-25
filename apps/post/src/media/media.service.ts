import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class MediaService {
  constructor(private readonly prismaService: PrismaService) {}
}
