import { Controller, Get, Param } from '@nestjs/common';
import { BossesService } from './bosses.service';

@Controller('bosses')
export class BossesController {
  constructor(private bossesService: BossesService) {}

  @Get()
  getBosses() {
    return this.bossesService.getBosses();
  }

  @Get(':id')
  getBoss(@Param('id') id: string) {
    return this.bossesService.getBoss(id);
  }
}
