import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';
import { Role } from '../interfaces/role.interface';

export class UpdaateUserDto {
  @ApiProperty({
    description: 'User role',
    enum: ['FULL_ACCESS', 'BASIC_ACCESS', 'VIDEO_ACCESS', 'COMMENT_ACCESS'],
  })
  @IsNotEmpty()
  @Matches(/^(FULL_ACCESS|BASIC_ACCESS|VIDEO_ACCESS|COMMENT_ACCESS)$/)
  role: Role;
}
