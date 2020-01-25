import { Injectable } from '@nestjs/common';
import { Grammar as GrammarEntity } from './grammars.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { GrammarDto } from './grammars.dto';

@Injectable()
export class GrammarsService {
  constructor(
    @InjectRepository(GrammarEntity)
    private readonly grammarRepository: Repository<GrammarEntity>,
  ) { }

  create(grammar: GrammarEntity) {
    const newGrammar = this.grammarRepository.create(grammar);
    return this.grammarRepository.save(newGrammar);
  }

  findAll(): Promise<GrammarEntity[]> {
    return this.grammarRepository.find();
  }

  findOne(id: string): Promise<GrammarEntity> {
    return this.grammarRepository.findOneOrFail(id);
  }

  update(id: string, grammar: GrammarDto): Promise<UpdateResult> {
    return this.grammarRepository.update(id, grammar);
  }

  delete(id: string): Promise<DeleteResult> {
    return this.grammarRepository.delete(id);
  }
}
