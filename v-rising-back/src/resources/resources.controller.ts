import { Controller, Get, Param } from '@nestjs/common';
import { ItemsService } from './resources.service';

@Controller('resources')
export class ItemsController {
  constructor(private resourceService: ItemsService) {}

  @Get()
  getAllResources() {
    return this.resourceService.getResources();
  }

  @Get(':id')
  getSpecificResource(@Param('id') id: string) {
    return this.resourceService.getResource(id);
  }
}
