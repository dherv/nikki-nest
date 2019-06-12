import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Word as WordEntity } from './words.entity';
import { Repository, Connection, UpdateResult, DeleteResult } from 'typeorm';
import { CreateWordsDto, UpdateWordDto } from './words.dto';

@Injectable()
export class WordsService {
  constructor(
    @InjectRepository(WordEntity)
    private readonly wordRepository: Repository<WordEntity>,
  ) {}

  async create(word: CreateWordsDto): Promise<WordEntity> {
    const newWord = this.wordRepository.create(word);
    return this.wordRepository.save(newWord);
  }

  findAll(): Promise<WordEntity[]> {
    return this.wordRepository.find();
  }

  findOne(id: string): Promise<WordEntity> {
    return this.wordRepository.findOne(id);
  }

  update(id: string, word: UpdateWordDto): Promise<UpdateResult> {
    return this.wordRepository.update(id, word);
  }

  delete(id: string): Promise<DeleteResult> {
    return this.wordRepository.delete(id);
  }
}
