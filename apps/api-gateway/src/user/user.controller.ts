import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { GrpcToHttpInterceptor } from 'nestjs-grpc-exceptions';
import { AccessTokenGuard } from '../lib/guards/access-token.guard';
import { ManyQuery } from '../types/query';
import { UserQuery } from './model/user.query';
import { UserService } from './user.service';

@Controller('user')
@UseInterceptors(GrpcToHttpInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AccessTokenGuard)
  findAll(
    @Query()
    query: ManyQuery,
  ) {
    const userQuery = new UserQuery(query.select, query.skip, query.take);
    return this.userService.findAll(userQuery.extract());
  }

  @Get(':id')
  @UseGuards(AccessTokenGuard)
  findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Post()
  create(@Body() data: { email: string; password: string }) {
    return this.userService.create(data);
  }
}
