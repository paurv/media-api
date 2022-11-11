import { Body, Controller, Post, Patch, Param } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginDto } from './dtos/login.dto';
import { Serialize } from 'src/interceptors/serialize.interceptors';
import { UserDto } from './dtos/user.dto';
import { UpdaateUserDto } from './dtos/update-user.dto';
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('register')
  createUser(@Body() body: CreateUserDto) {
    return this.authService.create(body);
  }

  @Post('login')
  loginUser(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Patch('role/:id')
  updateRole(@Body() body: UpdaateUserDto, @Param('id') id: string) {
    return this.userService.updateRole(id, body.role);
  }
}
