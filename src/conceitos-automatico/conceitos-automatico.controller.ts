import { Controller, Get } from '@nestjs/common';
import { AppService } from 'src/app/app.service';
import { ConceitosAutomaticoService } from './conceitos-automatico.service';

@Controller('conceitos-automatico')
export class ConceitosAutomaticoController {
  constructor(
    private readonly AppService: AppService,
    private readonly ConceitoAutomaticoService: ConceitosAutomaticoService,
  ) {}

  @Get('home')
  home(): string {
    return 'Conceitos Automático';
  }

  @Get('outro')
  outro(): string {
    return this.AppService.getOutro();
  }

  @Get('conceito')
  conceito() {
    return this.ConceitoAutomaticoService.getConceito();
  }
}
