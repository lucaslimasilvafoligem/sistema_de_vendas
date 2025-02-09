import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { StateService } from './state.service';
import { StateEntity } from './entities/state.entity';

@Controller('state')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<StateEntity[]> {
    return this.stateService.findAll();
  }
}
