import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from './news.entity';
import { NewsResponce, NewsData } from './news.types';
import { newsPerPage } from '../variables';

@Injectable()
export class NewsListService {
  constructor(
    @InjectRepository(News)
    private newsRepository: Repository<News>,
  ) {}

  async getNewsPerPage(page: string = '1'): Promise<NewsResponce> {
    const searchPage = Number(page);

    if (!searchPage) {
      throw new NotFoundException(`page should be number`);
    }

    const newsQuery = this.newsRepository.createQueryBuilder('task');

    const allNews = await newsQuery.getMany();

    const newsOnPage = allNews.slice(
      newsPerPage * (searchPage - 1),
      newsPerPage * searchPage,
    );

    const resp: NewsResponce = {
      data: newsOnPage.map(({ id, title, info, img }) => {
        return {
          id,
          title,
          info,
          img,
        };
      }),
      totalCount: allNews.length,
    };
    return resp;
  }

  async getSpecificNewsInfo(id: string): Promise<NewsData> {
    const searchElem = await this.newsRepository.findOne({
      where: {
        id,
      },
    });

    if (!searchElem) {
      throw new NotFoundException(`no such id ${id}`);
    }

    const { img } = searchElem;
    const responce: NewsData = {
      ...searchElem,
      img,
    };

    return responce;
  }
}
