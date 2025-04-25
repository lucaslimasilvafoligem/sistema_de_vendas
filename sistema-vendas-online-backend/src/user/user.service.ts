import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dtos/createUser.dto';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReturnUserDto } from './dtos/returnUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<ReturnUserDto> {
    await this.checkIfExistsByEmail(createUserDto.email);
    await this.checkIfExistsByCpf(createUserDto.cpf);

    const saltOrRounds = 10;
    const passwordHashed = await hash(createUserDto.password, saltOrRounds);

    const user = await this.userRepository.save({
      ...createUserDto,
      typeUser: 1,
      password: passwordHashed,
    });

    return new ReturnUserDto(user);
  }

  async findAll(): Promise<ReturnUserDto[]> {
    const users = await this.userRepository.find();
    return users.map((user) => {
      return new ReturnUserDto(user);
    });
  }

  async findByUserId(userId: number): Promise<ReturnUserDto> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    this.validateUser(user);

    return new ReturnUserDto(user);
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    this.validateUser(user);

    return user;
  }

  async findByIdUsingRelations(userId: number): Promise<ReturnUserDto> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: {
        addresses: {
          city: {
            state: true,
          },
        },
      },
    });

    this.validateUser(user);

    return new ReturnUserDto(user);
  }

  async checkIfExistsByEmail(email: string) {
    const emailExists = await this.existsByEmail(email);
    if (emailExists) {
      throw new ConflictException('O e-mail já está em uso.');
    }
  }

  async checkIfExistsByCpf(email: string) {
    const cpfExists = await this.existsByCpf(email);
    if (cpfExists) {
      throw new ConflictException('O cpf já está em uso.');
    }
  }

  async existsByUserId(userId: number): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: ['id'],
    });
    return !!user;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { email: email },
      select: ['id'],
    });
    return !!user;
  }

  async existsByCpf(cpf: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { cpf: cpf },
      select: ['id'],
    });
    return !!user;
  }

  async validateUser(user: UserEntity) {
    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }
  }
}
