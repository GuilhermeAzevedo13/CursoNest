import { Injectable } from '@nestjs/common';

@Injectable()
export class RecadosService {
  getfindAll(limit, offset): string {
    return `Essa rota retorna todos os recados Limit=${limit} e offset=${offset}`;
  }
}
