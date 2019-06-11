import { Injectable } from '@nestjs/common';
// import { Daily as IDaily } from './interfaces/daily.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { Daily as DailyEntity } from './daily.entity';
import { CreateDailyDto } from '../../dist/dailies/create-daily.dto';
import { UpdateDailyDto } from '../../dist/dailies/dto/dto';

@Injectable()
export class DailiesService {
  // private readonly dailies: IDaily[] = [];
  constructor(
    @InjectRepository(DailyEntity)
    private readonly dailyRepository: Repository<DailyEntity>,
  ) {}

  create(daily: CreateDailyDto): Promise<DailyEntity> {
    const newDaily = this.dailyRepository.create(daily);
    return this.dailyRepository.save(newDaily);
  }

  findAll(): Promise<DailyEntity[]> {
    return this.dailyRepository.find();
  }

  findOne(id: string): Promise<DailyEntity> {
    return this.dailyRepository.findOne(id);
  }

  update({
    id,
    updateDailyDto,
  }: {
    id: string;
    updateDailyDto: UpdateDailyDto;
  }): Promise<UpdateResult> {
    return this.dailyRepository.update(id, updateDailyDto);
  }

  delete(id: string): Promise<DeleteResult> {
    return this.dailyRepository.delete(id);
  }
}
