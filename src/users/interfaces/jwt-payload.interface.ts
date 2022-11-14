import { User } from '../entity/users.entity';
import { VALID_ROLES } from './role.interface';

export interface JwtPayload extends Partial<User> {
  id: string;
  role?: VALID_ROLES;
}
