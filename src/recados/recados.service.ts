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

  throwNotFoundError() {
    throw new NotFoundException('Recado nao encontrado');
  }

  async findAll(page: number = 1, pageSize: number = 10) {
    const [items, total] = await this.recadoRepository.findAndCount({
      order: { id: 'ASC' }, // opcional, mas recomendado
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return {
      data: items,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
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

  async create(CreateRecadosDto: CreateRecadosDto) {
    const novoRecado = {
      ...CreateRecadosDto,
      lido: false,
      data: new Date(),
    };

    const recado = this.recadoRepository.create(novoRecado); // O create retorna uma promise prometendo salvar o recado no banco de dados.

    return this.recadoRepository.save(recado); // O save retorna uma promise prometendo retornar o recado salvo.
  }

  async update(id: number, UpdateRecadosDto: UpdateRecadosDto) {
    const partialUpdateRecadoDTO = {
      lido: UpdateRecadosDto.lido,
      texto: UpdateRecadosDto.texto,
    };
    const recado = await this.recadoRepository.preload({
      id: id,
      ...partialUpdateRecadoDTO,
    });
    if (!recado) {
      this.throwNotFoundError();
    }
    return this.recadoRepository.save(recado!);
  }

  async remove(id: number) {
    const recado = await this.recadoRepository.findOneBy({
      id,
    });
    if (!recado) {
      this.throwNotFoundError();
    }
    return this.recadoRepository.remove(recado!);
  }
}
