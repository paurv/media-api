import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UploadImageDto {
  @ApiProperty({ type: String, description: 'Image description' })
  @IsOptional()
  @IsString()
  comment: string;
}
