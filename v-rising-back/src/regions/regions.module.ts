import { Module } from '@nestjs/common';
import { RegionsController } from './regions.controller';
import { RegionsService } from './regions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Regions } from './regions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Regions])],
  controllers: [RegionsController],
  providers: [RegionsService],
})
export class RegionsModule {}
