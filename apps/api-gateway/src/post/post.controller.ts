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
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { AccessTokenGuard } from '../lib/guards/access-token.guard';
import { ManyQuery } from '../types/query';
import { fileAcceptReg } from '../utils/file-accept';
import { PostDto } from './model/post.dto';
import { PostQuery } from './model/post.query';
import { PostService } from './post.service';

@Controller('post')
@UseGuards(AccessTokenGuard)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('medias', 10, {
      storage: diskStorage({
        destination: './local/media',
        filename: (req, file, cb) => {
          const filename: string = uuidv4();
          const extension: string = file.mimetype.split('/')[1];
          cb(null, `${filename}.${extension}`);
        },
      }),
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
    return this.postService.create({
      ...post,
      userId: req.user.userId,
      medias: files?.map((file) => ({
        url: file.path,
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
