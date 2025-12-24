import { Controller, Get } from '@nestjs/common';

@Controller('conceitos-automatico')
export class ConceitosAutomaticoController {
  @Get('home')
  home(): string {
    return 'Conceitos Automático';
  }
}
