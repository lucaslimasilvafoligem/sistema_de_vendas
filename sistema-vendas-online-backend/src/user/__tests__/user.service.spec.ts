import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { userEntityMock } from '../__mocks__/user.mock';
import { ReturnUserDto } from '../dtos/returnUser.dto';
import { createUserMock } from '../__mocks__/createUser.mock';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(userEntityMock),
            save: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  it('should return a user when email exists', async () => {
    const user = await service.findByEmail(userEntityMock.email);
    expect(user).toEqual(userEntityMock);
  });

  it('should throw NotFoundException when email does not exist', async () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error());

    await expect(service.findByEmail(userEntityMock.email)).rejects.toThrow();
  });

  it('should throw NotFoundException when email does not exist', async () => {
    const user = await service.findByIdUsingRelations(userEntityMock.id);

    expect(user).toEqual(new ReturnUserDto(userEntityMock));
  });

  it('should return errir if user exists', async () => {
    expect(service.create(createUserMock)).rejects.toThrow();
  });
});
