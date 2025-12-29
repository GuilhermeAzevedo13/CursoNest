import { Controller, Get } from '@nestjs/common';
import { RecadosService } from './recados.service';

@Controller('recados')
export class RecadosController {
  constructor(private readonly recadosService: RecadosService) {}
  // Encontrar todos os recados
  @Get()
  getfindAll(): string {
    return this.recadosService.getfindAll();
  }

  //Econtrar um recado passando um parametro
  @Get(':id')
  findOne() {
    return 'Essa rota retorna apenas um recado passando um parametro';
  }
}
