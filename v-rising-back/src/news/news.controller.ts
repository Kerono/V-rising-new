import { Controller, Get, Param, Query } from '@nestjs/common';
import { NewsListService } from './news.service';

//TODO remove?
async function delay() {
  return new Promise((resolve) => {
    setTimeout(resolve, 500);
  });
}

@Controller('news')
export class NewsController {
  constructor(private newsListService: NewsListService) {}
  @Get()
  async getNewsPerPage(@Query('page') page: string) {
    await delay();
    return this.newsListService.getNewsPerPage(page);
  }
  @Get(':id')
  async getSpecificNewsInfo(@Param('id') id: string) {
    await delay();
    return this.newsListService.getSpecificNewsInfo(id);
  }
}
