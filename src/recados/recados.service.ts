import { Injectable } from '@nestjs/common';

@Injectable()
export class RecadosService {
  getfindAll(): string {
    return 'Essa rota retorna todos os recados';
  }
}
