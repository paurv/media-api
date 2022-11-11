import { Expose } from 'class-transformer';
import { Role } from '../interfaces/role.interface';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  role: Role;

  @Expose()
  token: string;
}
