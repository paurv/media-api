import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { User } from './users.entity';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(userDto: CreateUserDto) {
    try {
      const { password, ...userData } = userDto;
      const salt = randomBytes(8).toString('hex');
      const hash = (await scrypt(password, salt, 32)) as Buffer;
      const pass = salt + '.' + hash.toString('hex');
      const user = this.repo.create({
        ...userData,
        password: pass,
      });
      await this.repo.save(user);
      return { ...user, token: this.getJwtToken({ id: user.id }) };
    } catch (e) {
      throw new BadRequestException('error');
    }
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
