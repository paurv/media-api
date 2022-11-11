import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { ImagesService } from './services/images.service';

@Module({
  providers: [ImagesService],
  controllers: [ImagesController],
})
export class ImagesModule {}
