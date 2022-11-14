import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { VALID_ROLES } from '../interfaces/role.interface';

export class UpdaateUserDto {
  @ApiProperty({
    description: 'User role',
    enum: ['FULL_ACCESS', 'BASIC_ACCESS', 'VIDEO_ACCESS', 'COMMENT_ACCESS'],
  })
  @IsNotEmpty()
  // @Matches(/^(FULL_ACCESS|BASIC_ACCESS|VIDEO_ACCESS|COMMENT_ACCESS)$/)
  @IsEnum(VALID_ROLES)
  role: VALID_ROLES;
}
