import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CityService } from './city.service';
import { CityEntity } from './entities/city.entity';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create() {}

  @Get('/:stateId')
  @HttpCode(HttpStatus.OK)
  async findAll(@Param('stateId') stateId: number): Promise<CityEntity[]> {
    return this.cityService.findAllByStateId(stateId);
  }
}
