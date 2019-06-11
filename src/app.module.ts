import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DailiesController } from './dailies/dailies.controller';
import { DailiesService } from './dailies/dailies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyModule } from './dailies/dailies.module';

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
    DailyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
