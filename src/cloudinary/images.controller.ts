import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { fileMimetypeFilter } from './file-mimetypes.filter';
import { ImagesService } from './images.service';

@Controller('images')
@ApiTags('Images')
export class ImagesController {
  constructor(private imagesService: ImagesService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', { fileFilter: fileMimetypeFilter('image') }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  uploadImage(@UploadedFile() image: Express.Multer.File) {
    return this.imagesService.uploadImageToCloudinary(image);
  }
}
