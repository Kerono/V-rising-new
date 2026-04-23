import { Controller, Get, Param } from '@nestjs/common';
import { ItemsService } from './resources.service';

@Controller('resources')
export class ItemsController {
  constructor(private resourceService: ItemsService) {}

  @Get()
  getResources() {
    return this.resourceService.getResources();
  }

  @Get(':id')
  getResource(@Param('id') id: string) {
    return this.resourceService.getResource(id);
  }
}
