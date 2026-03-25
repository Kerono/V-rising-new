import { Controller, Get } from '@nestjs/common';
import { ItemsService } from './resources.service';

@Controller('resources')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Get()
  getAllItems() {
    return this.itemsService.getAllResources();
  }
}
