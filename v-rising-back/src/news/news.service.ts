import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from './news.entity';
import type { NewsIds } from './news.entity';

export const defaultUrl = 'http://localhost:3000/';

const newsPerPage = 4;

type NewsData = {
  title: string;
  info: string;
  id: NewsIds;
  img: string;
};

type NewsResponce = {
  data: NewsData[];
  totalCount: number;
};

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
    const query = this.newsRepository.createQueryBuilder('task');

    const allNews = await query.getMany();

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
          img: `${defaultUrl}images/${img}`,
        };
      }),
      totalCount: allNews.length,
    };
    return resp;
  }
  async getSpecificNewsInfo(id: NewsIds): Promise<NewsData> {
    const searchElem = await this.newsRepository.findOne({
      where: {
        id,
      },
    });
    if (!searchElem) {
      throw new NotFoundException(`no such id ${id}`);
    }
    const data: NewsData = {
      ...searchElem,
      img: `${defaultUrl}/images/${id}.webp`,
    };
    return data;
  }
}
