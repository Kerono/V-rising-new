import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Regions } from './regions.entity';
import { Repository } from 'typeorm';
import type { Response } from './regions.types';

@Injectable()
export class RegionsService {
  constructor(
    @InjectRepository(Regions)
    private regionsRepo: Repository<Regions>,
  ) {}
  async getAll(): Promise<Response> {
    const query = this.regionsRepo.createQueryBuilder('regions');

    const regions = await query.getMany();

    return {
      data: [...regions],
      img: `vardoran-map.png`,
    };
  }
}
