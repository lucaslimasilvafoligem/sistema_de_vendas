import { Body, Controller, HttpCode, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { ReturnUserDto } from 'src/user/dtos/returnUser.dto';
import { AuthService } from './auth.service';
import { UserController } from 'src/user/user.controller';
import { UserEntity } from 'src/user/entities/user.entity';
import { ReturnLogin } from './dtos/returnLogin.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ) {}

    @Post()
    @UsePipes(ValidationPipe)
    @HttpCode(HttpStatus.OK)
    async login(
        @Body() loginDto: LoginDto
    ): Promise<ReturnLogin> {
        return this.authService.login(loginDto);
    }
}
