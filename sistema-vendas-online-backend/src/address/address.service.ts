import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressEntity } from './entities/address.entity';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { UserService } from 'src/user/user.service';
import { CityService } from 'src/city/city.service';

@Injectable()
export class AddressService {
    constructor(
        @InjectRepository(AddressEntity)
        private readonly addressRepository: Repository<AddressEntity>,
        private readonly userService: UserService,
        private readonly cityService: CityService,
    ) {};

    async create(createAddressDto: CreateAddressDto, userId: number): Promise<AddressEntity> {
        console.log(userId);
        
        this.checkIfExistsUserByUserId(userId);
        this.checkIfExistsCityByCityId(createAddressDto.cityId);
        return await this.addressRepository.save({
            ...createAddressDto,
            userId,
        });
    };

    // async getAll(addressId): Promise<AddressEntity> {
    //     return await this.addressRepository.find();
    // }

    async checkIfExistsUserByUserId(userId: number) {
        if (!this.userService.existsByUserId(userId)) {
            throw new NotFoundException(`user ${userId} not found`);
        }
    }

    async checkIfExistsCityByCityId(cityId: number) {
        if (!this.cityService.existsByCityId(cityId)) {
            throw new NotFoundException(`city ${cityId} not found`);
        }
    }
}
