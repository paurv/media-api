import { Module } from '@nestjs/common';
import { CloudinaryProvider } from './cloudinary';
import { CloudinaryService } from './cloudinary.service';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';

@Module({
  providers: [CloudinaryProvider, CloudinaryService, ImagesService],
  exports: [CloudinaryProvider, CloudinaryService],
  controllers: [ImagesController],
})
export class CloudinaryModule {}
