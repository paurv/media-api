import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { fileMimetypeFilter } from '../filters/file-mimetypes.filter';
import { AuthUser } from 'src/decorators/auth.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RoleProtected } from '../decorators/role-protected.decorator';
import { VALID_ROLES } from 'src/users/interfaces/role.interface';
import { UserRoleGuard } from 'src/Guards/user-role.guard';
import { User } from 'src/users/entity/users.entity';
import { VideosService } from '../services/videos.service';

@Controller('videos')
@ApiBearerAuth()
@ApiTags('Videos')
export class VideosController {
  constructor(private videoService: VideosService) {}

  @Post()
  @RoleProtected(VALID_ROLES.FULL_ACCESS, VALID_ROLES.COMMENT_ACCESS)
  @UseGuards(AuthGuard(), UserRoleGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileMimetypeFilter('video'),
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
    @UploadedFile() video: Express.Multer.File,
    @AuthUser('id') userId: User,
  ) {
    return this.videoService.uploadVideoToCloudinary(video, userId);
  }
}
