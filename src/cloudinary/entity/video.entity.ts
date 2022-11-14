import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/users/entity/users.entity';

@Entity()
export class Video {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  createdAt: string;

  @Column()
  video: string;

  @ManyToOne(() => User, (user) => user.video)
  user: User;
}
