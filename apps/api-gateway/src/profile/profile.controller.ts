import { ProfileDto } from '@app/common/types/profile';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import { GrpcToHttpInterceptor } from 'nestjs-grpc-exceptions';
import { v4 as uuidv4 } from 'uuid';
import { AccessTokenGuard } from '../lib/guards/access-token.guard';
import { imageAcceptReg } from '../utils/file-accept';
import { ProfileService } from './profile.service';

@Controller('profile')
@UseInterceptors(GrpcToHttpInterceptor)
@UseGuards(AccessTokenGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './local/media',
        filename: (req, file, cb) => {
          const filename: string = uuidv4();
          const extension: string = file.mimetype.split('/')[1];
          cb(null, `${filename}.${extension}`);
        },
      }),
    }),
  )
  create(
    @Req() req,
    @Body() createProfileDto: ProfileDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: imageAcceptReg,
        })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    file: Express.Multer.File,
  ) {
    return this.profileService.create({
      ...createProfileDto,
      avatar: file.path,
      userId: req.user.userId,
    });
  }

  @Get()
  findAll() {
    return this.profileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(id);
  }

  @Patch()
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './local/media',
        filename: (req, file, cb) => {
          const filename: string = uuidv4();
          const extension: string = file.mimetype.split('/')[1];
          cb(null, `${filename}.${extension}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file) {
          cb(null, false);
        } else {
          if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
            return cb(
              new BadRequestException('Only image files are allowed!'),
              false,
            );
          }
          cb(null, true);
        }
      },
    }),
  )
  update(
    @Req() req: any,
    @Body() updateProfileDto: ProfileDto & { id: string },
    @UploadedFile()
    file?: Express.Multer.File,
  ) {
    return this.profileService.update(updateProfileDto.id, {
      name: updateProfileDto.name,
      alias: updateProfileDto.alias,
      bio: updateProfileDto.bio,
      country: updateProfileDto.country,
      dob: updateProfileDto.dob,
      avatar: process.env.API_URL + '/' + file?.path,
      gender: updateProfileDto.gender,
      userId: req.user.userId,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profileService.remove(+id);
  }
}
