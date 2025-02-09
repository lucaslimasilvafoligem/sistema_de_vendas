import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CityService } from '../city.service';
import { CityEntity } from '../entities/city.entity';
import { CacheService } from '../../cache/cache.service';
import { cityMock } from '../__mocks__/city.mock';

describe('CityService', () => {
  let service: CityService;
  let cityRepository: Repository<CityEntity>;

  beforeEach(async () => {
    // const mockCacheManager = {
    //   get: jest.fn(),
    //   set: jest.fn(),
    // };

  const module: TestingModule = await Test.createTestingModule({
    providers: [
      CityService,
      {
        provide: CacheService,
        useValue: {
          getCache: jest.fn().mockResolvedValue([cityMock]),
          setCache: jest.fn(),
        },
      },
      {
        provide: getRepositoryToken(CityEntity),
        useValue: {
          findOne: jest.fn().mockResolvedValue(cityMock)
        },
      },
    ],
  }).compile();

    service = module.get<CityService>(CityService);
    cityRepository = module.get<Repository<CityEntity>>(
      getRepositoryToken(CityEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(cityRepository).toBeDefined();
  });

  it('return city', async () => {
    const city = await service.findById(cityMock.id);
    expect(city).toEqual(cityMock);
  });

  it('should return error when findOne does not find a city', async () => {
    jest.spyOn(cityRepository, 'findOne').mockRejectedValueOnce(new Error());
    await expect(service.findById(cityMock.id)).rejects.toThrow();
  });

  it('should return cities findAllByStateId', async () => {
    const city = await service.findAllByStateId(432432);
    expect(city).toEqual([cityMock]);
  });

  // it('should call cacheManager.get and cacheManager.set when fetching data', async () => {
  //   const stateId = 1;
  //   const mockCities = [{ id: 1, name: 'City1', stateId }];

  //   jest.spyOn(cityRepository, 'find').mockResolvedValue([]);

  //   const result = await service.findAllByStateId(stateId);

  //   expect(result).toEqual(mockCities);
  //   expect(cityRepository.find).toHaveBeenCalledWith({
  //     where: { stateId },
  //   });
  // });
});
