import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  // UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { fileMimetypeFilter } from './file-mimetypes.filter';
import { ImagesService } from './images.service';
import { UploadImageDto } from './dtos/upload-image.dto';
// import { User } from 'src/users/entity/users.entity';
// import { AuthGuard } from 'src/Guards/auth.guard';
import { AuthUser } from 'src/decorators/auth.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RoleProtected } from './decorators/role-protected.decorator';
import { VALID_ROLES } from 'src/users/interfaces/role.interface';
import { UserRoleGuard } from 'src/Guards/user-role.guard';
// import { AuthUser } from 'src/decorators/auth.decorator';
// import { JwtStrategy } from 'src/users/strategy/jwt.strategy';

@Controller('images')
@ApiBearerAuth()
@ApiTags('Images')
export class ImagesController {
  constructor(private imagesService: ImagesService) {}

  @Post()
  @RoleProtected(VALID_ROLES.FULL_ACCESS)
  @UseGuards(AuthGuard(), UserRoleGuard)
  @UseInterceptors(
    FileInterceptor('file', { fileFilter: fileMimetypeFilter('image') }),
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
    @AuthUser('role') role: any,
  ) {
    console.log({ role });
    // console.log('comment: ', body.comment);
    // console.log('token: ', token);
    // console.log('token: ', token);
    // return this.imagesService.uploadImageToCloudinary(image);x`
  }

  // @Get('/:userId')
  // getAllImages(@Param('userId') id: string) {
  //   return this.imagesService.findAll(userId);
  // }
}
