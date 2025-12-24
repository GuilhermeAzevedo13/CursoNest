import { Injectable } from '@nestjs/common';

@Injectable()
export class ConceitosAutomaticoService {
  getConceito(): string {
    return 'Conceito Automático Serviço!';
  }
}
