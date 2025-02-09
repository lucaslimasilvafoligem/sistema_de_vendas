import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressEntity } from './entities/address.entity';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { UserService } from '../user/user.service';
import { CityService } from '../city/city.service';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
    private readonly userService: UserService,
    private readonly cityService: CityService,
  ) {}

  async create(
    createAddressDto: CreateAddressDto,
    userId: number,
  ): Promise<AddressEntity> {
    this.checkIfExistsUserByUserId(userId);
    this.checkIfExistsCityByCityId(createAddressDto.cityId);
    return await this.addressRepository.save({
      ...createAddressDto,
      userId,
    });
  }

  // async getAll(addressId): Promise<AddressEntity> {
  //     return await this.addressRepository.find();
  // }

  async checkIfExistsUserByUserId(userId: number) {
    const exists = await this.userService.existsByUserId(userId);
    if (!exists) {
      throw new NotFoundException(`User ${userId} not found`);
    }
  }

  async checkIfExistsCityByCityId(cityId: number) {
    const exists = await this.cityService.existsByCityId(cityId);
    if (!exists) {
      throw new NotFoundException(`City ${cityId} not found`);
    }
  }
}
