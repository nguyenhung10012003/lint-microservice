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
import { GrpcToHttpInterceptor } from 'nestjs-grpc-exceptions';
import { AccessTokenGuard } from '../lib/guards/access-token.guard';
import { AwsS3Service } from '../s3/aws-s3.service';
import { imageAcceptReg } from '../utils/file-accept';
import { ProfileService } from './profile.service';

@Controller('profile')
@UseInterceptors(GrpcToHttpInterceptor)
@UseGuards(AccessTokenGuard)
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    private readonly s3Service: AwsS3Service,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('avatar'))
  async create(
    @Req() req,
    @Body() createProfileDto: ProfileDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: imageAcceptReg,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          fileIsRequired: false,
        }),
    )
    file?: Express.Multer.File,
  ) {
    const url = file && (await this.s3Service.uploadFile(file));
    return this.profileService.create({
      ...createProfileDto,
      avatar: url,
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
  async update(
    @Req() req: any,
    @Body() updateProfileDto: ProfileDto & { id: string },
    @UploadedFile()
    file?: Express.Multer.File,
  ) {
    const url = file && (await this.s3Service.uploadFile(file));
    return this.profileService.update(updateProfileDto.id, {
      name: updateProfileDto.name,
      alias: updateProfileDto.alias,
      bio: updateProfileDto.bio,
      country: updateProfileDto.country,
      dob: updateProfileDto.dob,
      avatar: url,
      gender: updateProfileDto.gender,
      userId: req.user.userId,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profileService.remove(+id);
  }
}
