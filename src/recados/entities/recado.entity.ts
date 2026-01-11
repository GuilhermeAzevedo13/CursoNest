import { Pessoa } from 'src/pessoas/entities/pessoa.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity()
export class RecadoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  texto: string;

  // Muitos Recados podem ser enviados por uma única Pessoa
  @ManyToOne(() => Pessoa)
  //Especifica a coluna que será usada de quem enviou a mensagem
  @JoinColumn({ name: 'de' })
  de: Pessoa;

  // Muitos Recados podem ser enviados para uma única Pessoa
  @ManyToOne(() => Pessoa)
  //Especifica a coluna que será usada de quem recebeu a mensagem
  @JoinColumn({ name: 'para' })
  para: Pessoa;

  @Column({ default: false })
  lido: boolean;

  @Column()
  data: Date; //created_at

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
