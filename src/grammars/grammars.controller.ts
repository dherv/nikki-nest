import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { GrammarsService } from './grammars.service';
import { Grammar } from './grammars.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { GrammarDto } from './grammars.dto';

@Controller('grammars')
export class GrammarsController {
  constructor(private readonly grammarsService: GrammarsService) {}

  @Post()
  async create(@Body() body: Grammar) {
    this.grammarsService.create(body);
  }

  @Get()
  async findAll(): Promise<Grammar[]> {
    return this.grammarsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Grammar> {
    return this.grammarsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() grammar: GrammarDto,
  ): Promise<UpdateResult> {
    return this.grammarsService.update(id, grammar);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.grammarsService.delete(id);
  }
}
