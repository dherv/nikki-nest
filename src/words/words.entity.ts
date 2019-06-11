import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Daily } from '../../src/dailies/daily.entity';

@Entity()
export class Word {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  word: string;

  @Column()
  translation: string;

  @Column({ nullable: true })
  ruby: string;

  @ManyToOne(type => Daily, daily => daily.words)
  daily: Daily;
}
