import { Controller, Get, Param } from '@nestjs/common';
import { WeaponsService } from './weapons.service';

@Controller('weapons')
export class WeaponsController {
  constructor(private weaponsService: WeaponsService) {}
  @Get()
  getWeapons() {
    return this.weaponsService.getWeapons();
  }
  @Get(':id')
  getResource(@Param('id') id: string) {
    return this.weaponsService.getWeapon(id);
  }
}
