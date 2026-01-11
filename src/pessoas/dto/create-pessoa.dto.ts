import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreatePessoaDto {
  @IsEmail()
  readonly email: string;

  // @IsStrongPassword({
  //   minLength: 8,
  //   minNumbers: 1,
  //   minSymbols: 1,
  // })
  @IsNotEmpty()
  readonly passwordHash: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
