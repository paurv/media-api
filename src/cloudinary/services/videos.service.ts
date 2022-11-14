import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entity/users.entity';
import { Repository } from 'typeorm';
import { Video } from '../entity/video.entity';
import { CloudinaryService } from './cloudinary.service';
import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';

@Injectable()
export class VideosService {
  constructor(
    private cloudinary: CloudinaryService,
    @InjectRepository(Video) private repo: Repository<Video>,
  ) {}

  async uploadVideoToCloudinary(file: Express.Multer.File, user: User) {
    // const storedData = await this.cloudinary.uploadImage(file).catch(() => {
    return await this.cloudinary.uploadImage(file).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });
    // return this.storeVideo(storedData, user);
  }

  private storeVideo(
    uploadedImage: UploadApiResponse | UploadApiErrorResponse,
    user: User,
  ) {
    if (!uploadedImage) {
      throw new BadRequestException('There was no video provided');
    }
    const data: Partial<Video> = {
      createdAt: uploadedImage.created_at,
      video: uploadedImage.secure_url,
      user,
    };

    return this.repo.save(data);
  }
}
