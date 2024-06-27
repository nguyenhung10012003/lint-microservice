import { Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from '../lib/guards/access-token.guard';
import { BlacklistService } from './blacklist.service';

@Controller('blacklist')
@UseGuards(AccessTokenGuard)
export class BlacklistController {
  constructor(private readonly blacklistService: BlacklistService) {}

  @Put()
  async update(@Req() req: any) {
    return this.blacklistService.update({
      userId: req.user.userId,
      list: req.body.list,
    });
  }

  @Get()
  async findOne(@Req() req: any) {
    return this.blacklistService.findOne({
      userId: req.user.userId,
    });
  }
}
