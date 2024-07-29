import { MediaType } from '@app/common/types/media';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AccessTokenGuard } from '../lib/guards/access-token.guard';
import { ParseTagsPipe } from '../lib/pipes/parse-tags.pipe';
import { AwsS3Service } from '../s3/aws-s3.service';
import { fileAcceptReg } from '../utils/file-accept';
import { PostDto } from './model/post.dto';
import { PostQuery } from './model/post.query';
import { PostService } from './post.service';

@Controller('post')
@UseGuards(AccessTokenGuard)
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly s3Service: AwsS3Service,
  ) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('medias', 10, {
      fileFilter: (req, file, cb) => {
        if (file) {
          if (!fileAcceptReg.test(file.mimetype))
            return cb(new BadRequestException('File is invalid type'), false);
          else if (file.size > +process.env.MAX_MEDIA_FILE_SIZE)
            return cb(new BadRequestException('File is too large'), false);
          cb(null, true);
        } else {
          cb(null, false);
        }
      },
    }),
  )
  @UsePipes(ParseTagsPipe)
  async create(
    @Req() req: any,
    @Body() post: PostDto,
    @UploadedFiles()
    files?: Express.Multer.File[],
  ) {
    const urls = await this.s3Service.uploadFiles(files);
    return this.postService.create({
      ...post,
      userId: req.user.userId,
      medias: urls?.map((url) => ({
        url: url,
        type: MediaType.IMAGE,
      })),
      tags: post.tags?.map((tag) => ({ name: tag })),
    });
  }

  @Get()
  async find(
    @Query()
    query: PostQuery,
  ) {
    const postQuery = new PostQuery({
      select: query.select,
      skip: query.skip,
      take: query.take,
      orderField: query.orderField,
      orderDirection: query.orderDirection,
      userId: query.userId,
      idsNotIn: query.idsNotIn,
    });

    return this.postService.findMany(postQuery.extract());
  }

  @Get('search')
  async search(
    @Query('key') key: string,
    @Query('skip') skip: number,
    @Query('take') take: number,
    @Query('tags') tags: string[],
    @Query('idsNotIn') idsNotIn: string[],
  ) {
    return this.postService.search({
      key,
      skip,
      take,
      tags: tags && [].concat(tags),
      idsNotIn: idsNotIn && [].concat(idsNotIn),
    });
  }
}
