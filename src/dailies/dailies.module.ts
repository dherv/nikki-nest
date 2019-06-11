import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailiesController } from './dailies.controller';
import { DailiesService } from './dailies.service';
import { Daily } from './daily.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Daily])],
  providers: [DailiesService],
  controllers: [DailiesController],
})
export class DailyModule {}
