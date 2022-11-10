import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/CreateUser.dto';
// import { AuthService } from './auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService, // private authService: AuthService,
  ) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  createUsers(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }
}
