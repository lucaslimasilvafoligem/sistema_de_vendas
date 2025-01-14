import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityEntity } from './entities/city.entity';
import { Repository } from 'typeorm';
import { CacheService } from 'src/cache/cache.service';

@Injectable()
export class CityService {
    constructor(
        @InjectRepository(CityEntity)
        private readonly cityRepository: Repository<CityEntity>,
        private readonly cacheService: CacheService,
    ) {}

    async findAllByStateId(stateId: number): Promise<CityEntity[]> {
        return this.cacheService.getCache<CityEntity[]>(
            `state_${stateId}`,
            () => this.cityRepository.find({
                where: {
                    stateId: stateId,
                },
            }),
        );
    }

    async existsByCityId(cityId: number): Promise<boolean> {
        const city = await this.cityRepository.findOne({
            where: { id: cityId },
            select: ['id'],
        });
        return !!city;
    }

}
