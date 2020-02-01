import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Query,
  Delete,
  Put,
} from '@nestjs/common';
import { DailyDto } from './daily.dto';
import { DailiesService } from './dailies.service';
import { Daily as DailyEntity } from './daily.entity';
import { UpdateResult, DeleteResult } from 'typeorm';

@Controller('dailies')
export class DailiesController {
  constructor(private readonly dailiesService: DailiesService) {}

  @Post()
  async create(@Body() daily: DailyDto): Promise<DailyEntity> {
    return await this.dailiesService.create(daily);
  }

  @Get()
  async findAll(@Query() query: DailyDto): Promise<DailyEntity[]> {
    return await this.dailiesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<DailyEntity> {
    return await this.dailiesService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() daily: DailyDto,
  ): Promise<UpdateResult> {
    return await this.dailiesService.update({ id, daily });
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return await this.dailiesService.delete(id);
  }
}
