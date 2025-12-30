import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateRecadosDto {
  //id: number; //Nao preciso disso pois eh gerado pela base de dadoos.
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(255)
  @IsOptional()
  readonly texto: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(12)
  readonly de: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(12)
  readonly para: string;
}

// dto Criar recado eh o q preciso para criar um novo recado na entidade.
