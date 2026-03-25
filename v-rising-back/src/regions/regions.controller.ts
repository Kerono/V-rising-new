import { Controller, Get } from '@nestjs/common';
import { RegionsService } from './regions.service';

@Controller('regions')
export class RegionsController {
  constructor(private regionsService: RegionsService) {}
  @Get()
  getAll() {
    return this.regionsService.getAll();
  }
}
