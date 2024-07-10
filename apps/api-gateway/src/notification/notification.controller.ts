import {
  Body,
  Controller,
  Patch,
  Query,
  UseGuards,
  Get,
  Request,
  Delete,
  Param,
  Post,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import {
  CreateNotificationDto,
  UpdateNotificationDto,
} from '@app/common/types/notification';
import { ManyQuery } from '../types/query';
import { AccessTokenGuard } from '../lib/guards/access-token.guard';

@Controller('notifications')
@UseGuards(AccessTokenGuard)
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @Get()
  async findMany(@Request() request, @Query() query: ManyQuery) {
    const userId = request.user.userId;
    return this.notificationService.findMany({
      where: {
        userId: userId,
      },
      skip: query.skip,
      take: query.take,
      orderBy: query.orderBy as string,
    });
  }

  @Post()
  async create(@Body() createDto: CreateNotificationDto) {
    return await this.notificationService.create(createDto);
  }

  @Patch()
  async update(@Body() updateDto: UpdateNotificationDto) {
    return await this.notificationService.update(updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.notificationService.delete({ id: id });
  }
}
