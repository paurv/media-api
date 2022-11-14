import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { fileMimetypeFilter } from './file-mimetypes.filter';
import { ImagesService } from './images.service';
import { UploadImageDto } from './dtos/upload-image.dto';
import { AuthUser } from 'src/decorators/auth.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RoleProtected } from './decorators/role-protected.decorator';
import { VALID_ROLES } from 'src/users/interfaces/role.interface';
import { UserRoleGuard } from 'src/Guards/user-role.guard';
import { User } from 'src/users/entity/users.entity';

@Controller('images')
@ApiBearerAuth()
@ApiTags('Images')
export class ImagesController {
  constructor(private imagesService: ImagesService) {}

  @Post()
  @RoleProtected(VALID_ROLES.FULL_ACCESS, VALID_ROLES.COMMENT_ACCESS)
  @UseGuards(AuthGuard(), UserRoleGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileMimetypeFilter('image'),
      limits: { files: 1 },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        comment: {
          type: 'string',
        },
      },
    },
  })
  async uploadImage(
    @Body() body: UploadImageDto,
    @UploadedFile() image: Express.Multer.File,
    @AuthUser('id') userId: User,
  ) {
    return this.imagesService.uploadImageToCloudinary(
      image,
      userId,
      body.comment,
    );
  }

  @Get()
  @UseGuards(AuthGuard(), UserRoleGuard)
  getAllImages(@AuthUser('id') userId: User) {
    console.log('user: ', userId);

    return this.imagesService.getAllImages(userId);
  }
}
