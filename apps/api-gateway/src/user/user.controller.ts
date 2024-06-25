import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { GrpcToHttpInterceptor } from 'nestjs-grpc-exceptions';
import { UserSelectQuery, extractUserSelect } from '../types/select.query';
import { SkipQuery } from '../types/skip.query';
import { UserSortQuery } from '../types/sort.query';
import { TakeQuery } from '../types/take.query';
import { UserWhereQuery } from '../types/where.query';
import { UserService } from './user.service';

@Controller('user')
@UseInterceptors(GrpcToHttpInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  findAll(
    @Query()
    query: SkipQuery &
      TakeQuery &
      UserSelectQuery &
      UserWhereQuery &
      UserSortQuery,
  ) {
    console.log();
    return this.userService.findAll({
      skip: query.skip,
      take: query.take,
      select: extractUserSelect(query),
    });
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Post()
  create(@Body() data: { email: string; password: string }) {
    return this.userService.create(data);
  }
}
