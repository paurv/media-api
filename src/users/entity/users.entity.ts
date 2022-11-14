import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Image } from 'src/cloudinary/entity/image.entity';
import { VALID_ROLES } from '../interfaces/role.interface';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  email: string;

  @Column({
    type: 'enum',
    enum: VALID_ROLES,
    default: VALID_ROLES.BASIC_ACCESS,
  })
  role: VALID_ROLES;

  @Column()
  password: string;

  @OneToMany(() => Image, (image) => image.user)
  images: Image[];
}
