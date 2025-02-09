import { ReturnStateDto } from '../../state/dtos/returnState.dto';
import { CityEntity } from '../entities/city.entity';

export class ReturnCityDto {
  name: string;
  state?: ReturnStateDto;

  constructor(city: CityEntity) {
    this.name = this.name;
    this.state = city.state ? new ReturnStateDto(city.state) : undefined;
  }
}
