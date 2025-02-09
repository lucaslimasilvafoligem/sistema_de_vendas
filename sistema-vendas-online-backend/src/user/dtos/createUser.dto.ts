import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-ZÀ-ÿ\s]+$/, {
    message: 'O nome não pode conter números ou caracteres especiais.',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[^\s@]+@[^\s@]+\.[a-zA-Z]+(\.[a-zA-Z]+)*$/, {
    message:
      'O email deve ser válido, sem espaços em branco e apenas "." permitido após o "@" como caractere especial.',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?:\d{2}\s)?9\d{4}-?\d{4}$/, {
    message:
      'O telefone deve começar com o dígito 9 e estar no formato: 83987622526, 83 9XXXX-XXXX, ou similar.',
  })
  phone: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
    message: 'O CPF deve estar no formato XXX.XXX.XXX-XX.',
  })
  cpf: string;

  @IsNotEmpty()
  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/,
    {
      message:
        'A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais (@, $, !, %, *, ?, &, .), sem espaços em branco.',
    },
  )
  password: string;
}
