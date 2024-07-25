import {
  Body,
  Controller,
  Patch,
  Query,
  UseGuards,
  Get,
  Request,
  Delete,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import {
  NotificationWhereUnique,
  UpdateStatusDto,
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

  @Patch()
  async updateStatus(
    @Request() request,
    @Body() updateStatusDto: UpdateStatusDto,
  ) {
    const userId = request.user.userId;
    updateStatusDto.userId = userId;
    return await this.notificationService.updateStatus(updateStatusDto);
  }

  @Delete()
  async delete(@Request() request, @Body() where: NotificationWhereUnique) {
    const userId = request.user.userId;
    where.userId = userId;
    await this.notificationService.delete(where);
  }
}
