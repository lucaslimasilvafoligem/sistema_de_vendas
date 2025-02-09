import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto } from './dtos/login.dto';
import { compare } from 'bcrypt';
import { ReturnUserDto } from '../user/dtos/returnUser.dto';
import { ReturnLogin } from './dtos/returnLogin.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginPayload } from './dtos/loginPayload.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<ReturnLogin> {
    await this.checkIfExistsEmail(loginDto.email);

    const user = await this.userService.findByEmail(loginDto.email);

    const isMatch = await compare(loginDto.password, user?.password);

    this.validatePassword(isMatch);

    return {
      accessToken: this.jwtService.sign({ ...new LoginPayload(user) }),
      user: new ReturnUserDto(user),
    };
  }

  async validatePassword(isMatch: boolean) {
    if (!isMatch) {
      throw new BadRequestException('email ou senha inválidos');
    }
  }

  async checkIfExistsEmail(email: string) {
    const exists = this.userService.existsByEmail(email);
    if (!exists) {
      throw new BadRequestException('email ou senha inválidos');
    }
  }
}
