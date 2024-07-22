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
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AccessTokenGuard } from '../lib/guards/access-token.guard';
import { AwsS3Service } from '../s3/aws-s3.service';
import { ManyQuery } from '../types/query';
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
  async find(@Query() query: ManyQuery) {
    const postQuery = new PostQuery(query.select, query.skip, query.take);
    return this.postService.findMany(postQuery.extract());
  }
}
