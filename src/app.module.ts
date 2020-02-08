import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyModule } from './dailies/dailies.module';
import { WordsModule } from './words/words.module';
import { GrammarsController } from './grammars/grammars.controller';
import { GrammarsService } from './grammars/grammars.service';
import { GrammarsModule } from './grammars/grammars.module';
import { TranslateController } from './translate/translate.controller';
import { SpeechController } from './speech/speech.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'database',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'nikki',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ConfigModule.forRoot(),
    DailyModule,
    WordsModule,
    GrammarsModule,
  ],
  controllers: [AppController, TranslateController, SpeechController],
  providers: [AppService],
})
export class AppModule {}
