import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Regions } from './regions.entity';
import { Repository } from 'typeorm';
import { defaultUrl } from 'src/variables';
import type { RegionsData, Response } from './regions.types';

@Injectable()
export class RegionsService {
  constructor(
    @InjectRepository(Regions)
    private regionsRepo: Repository<Regions>,
  ) {}
  async getAll(): Promise<Response> {
    const query = this.regionsRepo.createQueryBuilder('task');

    const regions: RegionsData[] = await query.getMany();

    return {
      data: [...regions],
      img: `${defaultUrl}images/vardoran-map.png`,
    };
  }
}
