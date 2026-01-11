import {
  IsNotEmpty,
  IsPositive,
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
  readonly texto: string;

  @IsPositive()
  deId: number;

  @IsPositive()
  paraId: number;
}

// dto Criar recado eh o q preciso para criar um novo recado na entidade.
