import { Module } from '@nestjs/common';
import { GrammarsService } from './grammars.service';
import { GrammarsController } from './grammars.controller';
import { Grammar } from './grammars.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Grammar])],
  providers: [GrammarsService],
  controllers: [GrammarsController],
})
export class GrammarsModule { }
