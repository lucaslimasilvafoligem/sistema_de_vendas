import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { UserService } from '../../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException } from '@nestjs/common';
import { userEntityMock } from '../../user/__mocks__/user.mock';
import { jwtMock } from '../__mocks__/jwt.mock';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;

  const validLoginDto = {
    email: 'lucas.almeida@example.com',
    password: 'Senha@123',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findByEmail: jest.fn().mockResolvedValue(userEntityMock),
            existsByEmail: jest.fn().mockResolvedValue(true),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue(jwtMock),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userService).toBeDefined();
  });

  it('should login with valid credentials', async () => {
    (jest.spyOn(bcrypt, 'compare') as jest.Mock).mockResolvedValue(true);

    const result = await service.login(validLoginDto);

    expect(result).toEqual({
      accessToken: jwtMock,
      user: expect.any(Object),
    });
  });

  it('should throw if email does not exist', async () => {
    jest.spyOn(userService, 'existsByEmail').mockResolvedValue(false);
    validLoginDto.email = 'invalidexample com';
    await expect(service.login(validLoginDto)).rejects.toThrow(
      new BadRequestException('email ou senha inválidos'),
    );
  });
});
