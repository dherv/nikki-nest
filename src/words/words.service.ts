import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Word as WordEntity } from './words.entity';
import { Repository, Connection } from 'typeorm';
import { CreateWordsDto } from './words.dto';

@Injectable()
export class WordsService {
  constructor(
    @InjectRepository(WordEntity)
    private readonly wordRepository: Repository<WordEntity>,
  ) {}

  async create(word: CreateWordsDto): Promise<WordEntity> {
    const newWord = this.wordRepository.create(word);
    console.log(newWord);
    return this.wordRepository.save(newWord);
  }

  findAll(): Promise<WordEntity[]> {
    return this.wordRepository.find();
  }
}
