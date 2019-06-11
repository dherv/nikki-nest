import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
