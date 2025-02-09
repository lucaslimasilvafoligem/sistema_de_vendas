import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { ReturnUserDto } from './dtos/returnUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(ValidationPipe)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async CreateUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ReturnUserDto> {
    return this.userService.create(createUserDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<ReturnUserDto[]> {
    return this.userService.findAll();
  }

  @Get('/:userId')
  @HttpCode(HttpStatus.OK)
  async findByIdUsingRelations(
    @Param('userId') userId: number,
  ): Promise<ReturnUserDto> {
    return this.userService.findByIdUsingRelations(userId);
  }
}
