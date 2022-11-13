import { BadRequestException, Injectable } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';

@Injectable()
export class ImagesService {
  constructor(private cloudinary: CloudinaryService) {}

  async uploadImageToCloudinary(file: Express.Multer.File, comment = '') {
    return await this.cloudinary.uploadImage(file).catch(() => {
      // const image = {
      //   createdAt: new Date(),
      //   comment: comment,
      //   // image:
      // };
      throw new BadRequestException('Invalid file type.');
    });
  }

  // findAll(userId: string) {
  //   const imagesData = this.cloudinary
  // }
}
