import { Module } from '@nestjs/common';
import { CloudinaryProvider } from './constants/cloudinary';
import { CloudinaryService } from './services/cloudinary.service';
import { ImagesService } from './services/images.service';
import { ImagesController } from './controllers/images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './entity/image.entity';
import { PassportModule } from '@nestjs/passport';
import { VideosController } from './controllers/videos.controller';
import { VideosService } from './services/videos.service';
import { Video } from './entity/video.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Image, Video]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [
    CloudinaryProvider,
    CloudinaryService,
    ImagesService,
    VideosService,
  ],
  exports: [CloudinaryProvider, CloudinaryService],
  controllers: [ImagesController, VideosController],
})
export class CloudinaryModule {}
