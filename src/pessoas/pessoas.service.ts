import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pessoa } from './entities/pessoa.entity';

@Injectable()
export class PessoasService {
  constructor(
    @InjectRepository(Pessoa)
    private pessoaRepository: Repository<Pessoa>,
  ) {}

  async create(createPessoaDto: CreatePessoaDto) {
    try {
      const pessoaData = {
        name: createPessoaDto.name,
        passwordHash: createPessoaDto.passwordHash,
        email: createPessoaDto.email,
      };
      const novaPessoa = this.pessoaRepository.create(pessoaData);
      await this.pessoaRepository.save(novaPessoa);
      return novaPessoa;
    } catch (error) {
      if ((error as { code?: string }).code === '23505') {
        // 23505 é o código de erro do PostgreSQL para violação de chave única
        throw new ConflictException('Email já cadastrado.');
      }
    }
  }

  async findAll(page: number = 1, pageSize: number = 10) {
    const [pessoas, total] = await this.pessoaRepository.findAndCount({
      order: { id: 'ASC' }, // opcional, mas recomendado
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return {
      data: pessoas,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  async findOne(id: number) {
    const pessoa = await this.pessoaRepository.findOneBy({ id });
    if (!pessoa) {
      throw new NotFoundException('Pessoa não encontrada.');
    }
    return pessoa;
  }

  async update(id: number, updatePessoaDto: UpdatePessoaDto) {
    const dataPessoa = {
      name: updatePessoaDto.name,
      passwordHash: updatePessoaDto.passwordHash,
    };

    const pessoa = await this.pessoaRepository.preload({
      id,
      ...dataPessoa,
    });

    if (!pessoa) {
      throw new NotFoundException('Pessoa não encontrada.');
    }

    return this.pessoaRepository.save(pessoa);
  }

  async remove(id: number) {
    const pessoa = await this.pessoaRepository.findOneBy({ id });
    if (!pessoa) {
      throw new NotFoundException('Pessoa não encontrada.');
    }
    return this.pessoaRepository.remove(pessoa);
  }
}
