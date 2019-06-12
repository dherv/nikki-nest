import { Module } from '@nestjs/common';
import { WordsService } from './words.service';
import { WordsController } from './words.controller';
import { Word } from './words.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Word])],
  providers: [WordsService],
  controllers: [WordsController],
})
export class WordsModule {}
