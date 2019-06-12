import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Word } from '../words/words.entity';

@Entity()
export class Daily {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  title: string;

  @Column('int')
  user_id: number;

  @Column('int')
  language_id: number;

  @Column('text')
  body: string;

  @OneToMany(type => Word, word => word.daily)
  words: Word[];
}
