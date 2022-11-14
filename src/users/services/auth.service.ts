import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from 'src/dtos/login.dto';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { User } from '../entity/users.entity';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

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

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.repo.findOne({
      where: { email },
      select: { email: true, password: true, id: true, role: true },
    });

    if (!user) throw new UnauthorizedException('Credentials are not valid');

    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Credentials are not valid');
    }

    return {
      ...user,
      token: this.getJwtToken({ id: user.id, role: user.role }),
    };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  async checkAuthStatus(user: User) {
    return {
      ...user,
      token: this.getJwtToken({ id: user.id, role: user.role }),
    };
  }
}
