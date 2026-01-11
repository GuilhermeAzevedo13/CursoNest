import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecadosDto } from './dto/create-recados.dto';
import { RecadoEntity } from './entities/recado.entity';
import { UpdateRecadosDto } from './dto/update-recados.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PessoasService } from 'src/pessoas/pessoas.service';

@Injectable()
export class RecadosService {
  constructor(
    @InjectRepository(RecadoEntity)
    private readonly recadoRepository: Repository<RecadoEntity>,
    private readonly pessoasService: PessoasService,
  ) {}

  throwNotFoundError() {
    throw new NotFoundException('Recado nao encontrado');
  }

  async findAll(page: number = 1, pageSize: number = 10) {
    const [items, total] = await this.recadoRepository.findAndCount({
      order: { id: 'ASC' },
      skip: (page - 1) * pageSize,
      take: pageSize,
      relations: ['de', 'para'],
      select: {
        de: {
          id: true,
          name: true,
        },
        para: {
          id: true,
          name: true,
        },
      },
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
    // Encontrar a pessoa que está criando o recado
    // Encontrar a pessoa para quem o recado está sendo enviado
    const novoRecado = {
      ...CreateRecadosDto,
      lido: false,
      data: new Date(),
    };
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
