import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { RecadosService } from './recados.service';

@Controller('recados')
export class RecadosController {
  constructor(private readonly recadosService: RecadosService) {}
  // Encontrar todos os recados
  @HttpCode(HttpStatus.OK)
  @Get()
  getfindAll(): string {
    return this.recadosService.getfindAll();
  }

  //Econtrar um recado passando um parametro
  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log(id);
    return `Essa rota retorna apenas um recado passando um parametro com ID ${id}`;
  }

  @Post()
  create(@Body() body: any) {
    console.log(body);
    return `Essa rota cria um recado`;
  }
}
