import { Body, Controller, Get, HttpCode, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AddressEntity } from './entities/address.entity';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { UserId } from 'src/decorators/user-id.decorator';

@Controller('address')
export class AddressController {
    constructor(private readonly addressController: AddressService) {}

    @Roles(UserType.User)
    @Post()
    @UsePipes(ValidationPipe)
    @HttpCode(200)
    async create(
        @Body() createAddressDto: CreateAddressDto,
        @UserId() userId: number
    ): Promise<AddressEntity> {
        return this.addressController.create(createAddressDto, userId);
    }

    // @Get()
    // @HttpCode(200)
    // async findById(addressId: number): Promise<AddressEntity> {
    //     return this.addressController.findAll(addressId);
    // }
}