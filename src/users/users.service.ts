import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './interfaces/role.interface';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async updateRole(id: string, role: Role) {
    if (!id || !role) throw new BadRequestException('Full data not provided');
    const user = await this.repo.findOne({ where: { id: id } });
    user.role = role;
    return this.repo.save(user);
  }
}
