import { Controller, Get, Param } from '@nestjs/common';
import { AbilitiesService } from './abilities.service';

@Controller('abilities')
export class AbilitiesController {
  constructor(private abilitiesService: AbilitiesService) {}

  @Get()
  getNewsPerPage() {
    return this.abilitiesService.getAbilities();
  }

  @Get(':id')
  async getSpecificNewsInfo(@Param('id') id: string) {
    return this.abilitiesService.getAbility(id);
  }
}
