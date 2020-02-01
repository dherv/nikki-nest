import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Word } from '../words/words.entity';
import { Grammar } from '../grammars/grammars.entity';

@Entity()
export class Daily {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', default: 1 })
  userId: number;

  @Column({ type: 'int', default: 1 })
  languageId: number;

  @Column('text')
  text: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt: Date;

  @OneToMany(type => Word, word => word.daily, { cascade: ['insert'] })
  words: Word[];

  @OneToMany(type => Grammar, grammar => grammar.daily, { cascade: ['insert'] })
  grammars: Grammar[];
}
