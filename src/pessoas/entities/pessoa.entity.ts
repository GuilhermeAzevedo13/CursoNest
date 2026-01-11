import { IsEmail } from 'class-validator';
import { RecadoEntity } from 'src/recados/entities/recado.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Pessoa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  passwordHash: string;

  @Column({ length: 100 })
  name: string;

  // Uma Pessoa pode enviar varios Recados
  // Esses recados sao relacionadosao campo "de" na entidade RecadoEntity
  @OneToMany(() => RecadoEntity, (recado) => recado.de)
  recadosEnviados: RecadoEntity[];

  // Uma Pessoa pode receber varios Recados
  // Esses recados sao relacionadosao campo "para" na entidade RecadoEntity
  @OneToMany(() => RecadoEntity, (recado) => recado.para)
  recadosRecebidos: RecadoEntity[];

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
