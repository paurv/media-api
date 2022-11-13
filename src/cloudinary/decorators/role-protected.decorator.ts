import { SetMetadata } from '@nestjs/common';
import { VALID_ROLES } from 'src/users/interfaces/role.interface';

export const META_ROLES = 'roles';
// agrega los roles validos a la metadadta de la request
export const RoleProtected = (...args: VALID_ROLES[]) => {
  return SetMetadata(META_ROLES, args);
};
