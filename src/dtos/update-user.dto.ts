import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { VALID_ROLES } from 'src/users/interfaces/role.interface';

export class UpdaateUserDto {
  @ApiProperty({
    description: 'User role',
    enum: ['FULL_ACCESS', 'BASIC_ACCESS', 'VIDEO_ACCESS', 'COMMENT_ACCESS'],
  })
  @IsNotEmpty()
  @IsEnum(VALID_ROLES, {
    message:
      'Valid roles: ( FULL_ACCESS | BASIC_ACCESS | VIDEO_ACCESS | COMMENT_ACCESS )',
  })
  role: VALID_ROLES;
}
