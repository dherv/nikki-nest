import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { Daily as DailyEntity } from './daily.entity';
import { DailyDto } from './daily.dto';

@Injectable()
export class DailiesService {
  constructor(
    @InjectRepository(DailyEntity)
    private readonly dailyRepository: Repository<DailyEntity>,
  ) {}

  create(daily: DailyDto): Promise<DailyEntity> {
    const newDaily = this.dailyRepository.create(daily);
    return this.dailyRepository.save(newDaily);
  }

  findAll(): Promise<DailyEntity[]> {
    return this.dailyRepository.find({
      relations: ['words', 'grammars'],
    });
  }

  findOne(id: string): Promise<DailyEntity> {
    return this.dailyRepository.findOne(id);
  }

  update({
    id,
    daily,
  }: {
    id: string;
    daily: DailyDto;
  }): Promise<UpdateResult> {
    return this.dailyRepository.update(id, daily);
  }

  delete(id: string): Promise<DeleteResult> {
    return this.dailyRepository.delete(id);
  }
}
