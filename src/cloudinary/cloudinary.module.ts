import { Module } from '@nestjs/common';
import { CloudinaryProvider } from './cloudinary';
import { CloudinaryService } from './cloudinary.service';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './entity/image.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([Image]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [CloudinaryProvider, CloudinaryService, ImagesService],
  exports: [CloudinaryProvider, CloudinaryService],
  controllers: [ImagesController],
})
export class CloudinaryModule {}
