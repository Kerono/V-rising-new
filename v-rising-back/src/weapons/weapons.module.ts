import { Module } from '@nestjs/common';
import { WeaponsController } from './weapons.controller';
import { WeaponsService } from './weapons.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Bosses,
  Weapons,
  Weapons_Bosses,
  Weapons_Skills,
} from './weapons.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Weapons, Weapons_Skills, Weapons_Bosses, Bosses]),
  ],
  controllers: [WeaponsController],
  providers: [WeaponsService],
})
export class WeaponsModule {}
