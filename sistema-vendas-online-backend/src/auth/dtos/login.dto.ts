import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^[^\s@]+@[^\s@]+\.[a-zA-Z]+(\.[a-zA-Z]+)*$/, {
    message:
      'O email deve ser válido, sem espaços em branco e apenas "." permitido após o "@" como caractere especial.',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
