import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { WordsService } from './words.service';
import { CreateWordsDto, UpdateWordDto } from './words.dto';
import { Word } from './words.entity';
import { UpdateResult, DeleteResult } from 'typeorm';

@Controller('words')
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  @Post()
  async create(@Body() word: CreateWordsDto): Promise<Word> {
    return this.wordsService.create(word);
  }

  @Get()
  async findAll(): Promise<Word[]> {
    return this.wordsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Word> {
    return this.wordsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() word: UpdateWordDto,
  ): Promise<UpdateResult> {
    return this.wordsService.update(id, word);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.wordsService.delete(id);
  }
}
