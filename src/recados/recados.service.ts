import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecadosDto } from './dto/create-recados.dto';
import { RecadoEntity } from './entities/recado.entity';
import { UpdateRecadosDto } from './dto/update-recados.dto';

@Injectable()
export class RecadosService {
  private lastId = 1;
  private recados: RecadoEntity[] = [
    {
      id: 1,
      texto: 'Este eh o recado inicial',
      de: 'Joao',
      para: 'jose',
      lido: false,
      data: new Date(),
    },
  ];

  throwNotFoundError() {
    throw new NotFoundException('Recado nao encontrado');
  }

  findAll() {
    return this.recados;
  }

  findOne(id: string) {
    const recado = this.recados.find((item) => item.id === +id);

    if (recado) return recado;

    this.throwNotFoundError();
  }

  create(CreateRecadosDto: CreateRecadosDto) {
    this.lastId++;
    const id = this.lastId;
    const novoRecado = {
      id,
      ...CreateRecadosDto,
      lido: false,
      data: new Date(),
    };
    this.recados.push(novoRecado);

    return novoRecado;
  }

  update(id: string, UpdateRecadosDto: UpdateRecadosDto) {
    const recadoExistenteIndex = this.recados.findIndex(
      (item) => item.id === +id,
    );
    if (recadoExistenteIndex < 0) {
      this.throwNotFoundError();
    }
    const recadoExistente = this.recados[recadoExistenteIndex];
    this.recados[recadoExistenteIndex] = {
      ...recadoExistente,
      ...UpdateRecadosDto,
    };
  }

  remove(id: string) {
    const recadoExistenteIndex = this.recados.findIndex(
      (item) => item.id === +id,
    );

    if (recadoExistenteIndex < 0) {
      this.throwNotFoundError();
    }

    const recado = this.recados[recadoExistenteIndex];

    this.recados.splice(recadoExistenteIndex, 1);

    return recado;
  }
}
