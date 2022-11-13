import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Image } from 'src/cloudinary/entity/image.entity';

@Entity()
export class User {
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

  @OneToMany(() => Image, (image) => image.user)
  images: Image[];
}
