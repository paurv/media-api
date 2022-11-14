import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CloudinaryService } from './cloudinary.service';
import { Image } from '../entity/image.entity';
import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import { User } from 'src/users/entity/users.entity';
import { PaginationDto } from 'src/dtos/pagination.dto';

@Injectable()
export class ImagesService {
  constructor(
    private cloudinary: CloudinaryService,
    @InjectRepository(Image) private repo: Repository<Image>,
  ) {}

  async uploadImageToCloudinary(
    file: Express.Multer.File,
    user: User,
    comment?: string,
  ) {
    const storedData = await this.cloudinary.uploadImage(file).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });
    return this.storeImage(storedData, user, comment);
  }

  private storeImage(
    uploadedImage: UploadApiResponse | UploadApiErrorResponse,
    user: User,
    comment?: string,
  ) {
    if (!uploadedImage) {
      throw new BadRequestException('There was no image provided');
    }
    const data: Partial<Image> = {
      createdAt: uploadedImage.created_at,
      image: uploadedImage.secure_url,
      user,
      comment: comment || '',
    };

    return this.repo.save(data);
  }

  async getAllImages(userId: string, paginationDto: PaginationDto) {
    const { limit = 10, from = 0 } = paginationDto;

    const filter = { id: userId } as Partial<User>;

    const images = await this.repo.find({
      where: { user: filter },
      order: {
        createdAt: 'ASC',
      },
      take: limit,
      skip: from,
    });

    return images;
  }
}
