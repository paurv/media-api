import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  // @PrimaryGeneratedColumn()
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  email: string;

  @Column({
    default: 'BASIC_ACCESS',
  })
  role: 'FULL_ACCESS' | 'BASIC_ACCESS' | 'VIDEO_ACCESS' | 'COMMENT_ACCESS';

  @Column()
  password: string;
}
