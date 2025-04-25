import { Test, TestingModule } from '@nestjs/testing';
import { AddressService } from '../address.service';
import { AddressEntity } from '../entities/address.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../../user/user.service';
import { CityService } from '../../city/city.service';
import { userEntityMock } from '../../user/__mocks__/user.mock';
import { cityMock } from '../../city/__mocks__/city.mock';
import { addressMock } from '../__mocks__/address.mock';
import { createAddressMock } from '../__mocks__/create-address.mock';

describe('AddressService', () => {
  let service: AddressService;
  let addressRepository: Repository<AddressEntity>;
  let userService: UserService;
  let cityService: CityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        {
          provide: getRepositoryToken(AddressEntity),
          useClass: Repository,
        },
        {
          provide: UserService,
          useValue: {
            existsByUserId: jest.fn().mockResolvedValue(userEntityMock),
            findByUserId: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
        {
          provide: CityService,
          useValue: {
            existsByCityId: jest.fn().mockResolvedValue(cityMock),
            findById: jest.fn().mockResolvedValue(cityMock),
          },
        },
      ],
    }).compile();

    service = module.get<AddressService>(AddressService);
    userService = module.get<UserService>(UserService);
    cityService = module.get<CityService>(CityService);
    addressRepository = module.get<Repository<AddressEntity>>(
      getRepositoryToken(AddressEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(cityService).toBeDefined();
    expect(userService).toBeDefined();
    expect(addressRepository).toBeDefined();
  });

  it('should return address after save', async () => {
    jest.spyOn(addressRepository, 'save').mockResolvedValueOnce(addressMock);

    const address = await service.create(createAddressMock, userEntityMock.id);

    expect(address).toEqual(addressMock);
  });

  it('should return error if exception in userService', async () => {
    jest.spyOn(userService, 'findByUserId').mockRejectedValueOnce(new Error());

    await expect(
      service.create(createAddressMock, userEntityMock.id),
    ).rejects.toThrow();
  });

  it('should return error if exception in cityService', async () => {
    jest.spyOn(cityService, 'findById').mockRejectedValueOnce(new Error());

    await expect(
      service.create(createAddressMock, cityMock.id),
    ).rejects.toThrow();
  });
});
