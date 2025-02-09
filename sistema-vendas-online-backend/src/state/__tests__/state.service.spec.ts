import { Test, TestingModule } from '@nestjs/testing';
import { StateService } from '../state.service';
import { Repository } from 'typeorm';
import { StateEntity } from '../entities/state.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { stateMock } from '../__mocks__/state.mock';

describe('StateService', () => {
  let service: StateService;
  let stateRepository: Repository<StateEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StateService,
        {
          provide: getRepositoryToken(StateEntity),
          useValue: {
            find: jest.fn().mockResolvedValue([stateMock]),
          },
        },
      ],
    }).compile();

    service = module.get<StateService>(StateService);
    stateRepository = module.get<Repository<StateEntity>>(
      getRepositoryToken(StateEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(stateRepository).toBeDefined();
  });

  it('should return list of states', async () => {
    const states = await service.findAll();


    expect(states).toEqual([stateMock]);
  });

  it('should throw NotFoundException when email does not exist', async () => {
    jest.spyOn(stateRepository, 'find').mockRejectedValueOnce(new Error());

    await expect(service.findAll()).rejects.toThrow();
  });

  //   it('should throw NotFoundException when email does not exist', async () => {
  //     const user = await service.findByIdUsingRelations(userEntityMock.id);

  //     expect(user).toEqual(new ReturnUserDto(userEntityMock));
  //   });

  //   it('should return errir if user exists', async () => {
  //     expect(service.create(createUserMock)).rejects.toThrow();
  //   });
});
