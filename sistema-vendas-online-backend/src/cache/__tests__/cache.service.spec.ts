import { Test, TestingModule } from '@nestjs/testing';
import { CacheService } from '../cache.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { userEntityMock } from '../../user/__mocks__/user.mock';

describe('CacheService', () => {
  let service: CacheService;

  const mockCacheManager = {
    get: jest.fn(),
    set: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CacheService,
        {
          provide: CACHE_MANAGER,
          useValue: mockCacheManager,
        },
      ],
    }).compile();

    service = module.get<CacheService>(CacheService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return cached data if exists', async () => {
    mockCacheManager.get.mockResolvedValueOnce([userEntityMock]);

    const result = await service.getCache('users', async () => []);
    expect(result).toEqual([userEntityMock]);
    expect(mockCacheManager.get).toHaveBeenCalledWith('users');
    expect(mockCacheManager.set).not.toHaveBeenCalled();
  });

  it('should call functionRequest and cache the result if no cache exists', async () => {
    mockCacheManager.get.mockResolvedValueOnce(null);
    const mockFunction = jest.fn().mockResolvedValueOnce(['new-data']);

    const result = await service.getCache('new-key', mockFunction);

    expect(mockFunction).toHaveBeenCalled();
    expect(mockCacheManager.set).toHaveBeenCalledWith('new-key', ['new-data']);
    expect(result).toEqual(['new-data']);
  });

  it('should call cacheManager.set after getting data from functionRequest', async () => {
    mockCacheManager.get.mockResolvedValueOnce(null);
    const freshData = ['fresh-data'];
    const mockFunction = jest.fn().mockResolvedValue(freshData);

    await service.getCache('fresh-key', mockFunction);

    expect(mockCacheManager.set).toHaveBeenCalledWith('fresh-key', freshData);
  });

  it('should handle generic return types properly', async () => {
    const mockGenericData = { id: 1, name: 'Test' };
    mockCacheManager.get.mockResolvedValueOnce(mockGenericData);

    const result = await service.getCache(
      'generic',
      async () => mockGenericData,
    );
    expect(result).toEqual(mockGenericData);
  });

  it('should not call functionRequest if cached data exists', async () => {
    mockCacheManager.get.mockResolvedValueOnce('cached');
    const mockFunction = jest.fn();

    const result = await service.getCache('cache-test', mockFunction);

    expect(result).toBe('cached');
    expect(mockFunction).not.toHaveBeenCalled();
  });
});
