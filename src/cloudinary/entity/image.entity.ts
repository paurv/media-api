import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/users/entity/users.entity';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  createdAt: string;

  @Column()
  comment: string;

  @Column()
  image: string;

  @ManyToOne(() => User, (user) => user.images)
  user: User;
}
