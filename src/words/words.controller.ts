import { Controller, Post, Body, Get } from '@nestjs/common';
import { WordsService } from './words.service';
import { CreateWordsDto } from './words.dto';
import { Word } from './words.entity';

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
}
