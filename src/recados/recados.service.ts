import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
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

  async findAll(PaginationDto: { page?: number; pageSize?: number }) {
    if (!PaginationDto) {
      throw new BadRequestException('Pagination parameters are required');
    }

    const { page = 1, pageSize = 10 } = PaginationDto;
    const [items, total] = await this.recadoRepository.findAndCount({
      order: { id: 'ASC' },
      relations: ['de', 'para'],
      skip: (page - 1) * pageSize,
      take: pageSize,
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
    }); // findOne retorna uma promise prometendo retornar um recado especifico.

    if (recado) return recado;

    this.throwNotFoundError();
  }

  async create(CreateRecadosDto: CreateRecadosDto) {
    const { deId, paraId } = CreateRecadosDto;
    const de = await this.pessoasService.findOne(deId);
    const para = await this.pessoasService.findOne(paraId);

    const novoRecado = {
      texto: CreateRecadosDto.texto,
      de,
      para,
      lido: false,
      data: new Date(),
    };
    const recado = this.recadoRepository.create(novoRecado);
    await this.recadoRepository.save(recado);

    return {
      ...recado,
      de: {
        id: recado.de.id,
      },
      para: {
        id: recado.para.id,
      },
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
