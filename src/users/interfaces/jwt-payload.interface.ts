import { User } from '../users.entity';

export interface JwtPayload extends Partial<User> {
  id: string;
  role?: 'FULL_ACCESS' | 'BASIC_ACCESS' | 'VIDEO_ACCESS' | 'COMMENT_ACCESS';
}
