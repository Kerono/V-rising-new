import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsListService } from './news.service';
import { News } from './news.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([News])],
  controllers: [NewsController],
  providers: [NewsListService],
})
export class NewsModule {}
