import { UserEntity } from '../entities/user.entity';
import { UserType } from '../enum/user-type.enum';

export const userEntityMock: UserEntity = {
  cpf: '987.234.242-12',
  createdAt: new Date(),
  email: 'test@gmail.com',
  id: 2313,
  name: 'nameMock',
  password: 'senhA.c0m',
  phone: '82912345678',
  typeUser: UserType.User,
  updatedAt: new Date(),
};
