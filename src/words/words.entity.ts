import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Daily } from '../dailies/daily.entity';

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

  @Column({ type: 'int', nullable: true })
  dailyId: number;

  @ManyToOne(type => Daily)
  console.log({type})
  @JoinColumn({ name: 'dailyId' })
  daily: Daily;
}
