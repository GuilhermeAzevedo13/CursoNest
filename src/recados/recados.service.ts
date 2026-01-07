import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecadosDto } from './dto/create-recados.dto';
import { RecadoEntity } from './entities/recado.entity';
import { UpdateRecadosDto } from './dto/update-recados.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RecadosService {
  constructor(
    @InjectRepository(RecadoEntity)
    private readonly recadoRepository: Repository<RecadoEntity>,
  ) {}

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

  async findAll() {
    const recados = await this.recadoRepository.find(); // Esse find retorna uma promise prometendo retornar todos os recados.
    return recados;
  }

  async findOne(id: number) {
    const recado = await this.recadoRepository.findOne({
      where: {
        id,
      },
    }); // findOne retorna uma promise prometendo retornar um recado especifico.

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
    return this.recados[recadoExistenteIndex];
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
