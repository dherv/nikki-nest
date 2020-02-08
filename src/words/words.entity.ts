import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Daily } from '../dailies/daily.entity';

@Entity()
export class Word {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  translation: string;

  @Column({ nullable: true })
  example: string;

  @Column({ nullable: true })
  ruby: string;

  @Column({ type: 'int', nullable: true })
  dailyId: number;

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

  @ManyToOne(type => Daily)
  @JoinColumn({ name: 'dailyId' })
  daily: Daily;
}
