import { PartialType } from '@nestjs/mapped-types';
import { CreateRecadosDto } from './create-recados.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateRecadosDto extends PartialType(CreateRecadosDto) {
  @IsBoolean()
  @IsOptional()
  readonly lido?: boolean;
}
//? -> define q o atributo eh opcional
// DTO update eh o q preciso para atualizar a entidade que ja ta formada.
