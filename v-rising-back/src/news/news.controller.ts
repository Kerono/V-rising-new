import { Controller, Get, Param, Query } from '@nestjs/common';
import { NewsListService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private newsListService: NewsListService) {}

  @Get()
  async getNewsPerPage(@Query('page') page: string) {
    return this.newsListService.getNewsPerPage(page);
  }

  @Get(':id')
  async getSpecificNewsInfo(@Param('id') id: string) {
    return this.newsListService.getSpecificNewsInfo(id);
  }
}
