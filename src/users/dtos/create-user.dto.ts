import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ type: String, description: 'User email' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, description: 'User password' })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(15)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;

  @ApiProperty({
    description: 'User role',
    enum: ['FULL_ACCESS', 'BASIC_ACCESS', 'VIDEO_ACCESS', 'COMMENT_ACCESS'],
    default: 'BASIC_ACCESS',
  })
  @IsOptional()
  @Matches(/^(FULL_ACCESS|BASIC_ACCESS|VIDEO_ACCESS|COMMENT_ACCESS)$/)
  role: 'FULL_ACCESS' | 'BASIC_ACCESS' | 'VIDEO_ACCESS' | 'COMMENT_ACCESS';
}
