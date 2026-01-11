import { PartialType } from '@nestjs/mapped-types';
import { CreatePessoaDto } from './create-pessoa.dto';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdatePessoaDto extends PartialType(CreatePessoaDto) {
  @IsEmail()
  readonly email?: string;

  // @IsStrongPassword({
  //   minLength: 8,
  //   minNumbers: 1,
  //   minSymbols: 1,
  // })
  @IsNotEmpty()
  readonly passwordHash?: string;

  @IsNotEmpty()
  @IsString()
  readonly name?: string;
}
