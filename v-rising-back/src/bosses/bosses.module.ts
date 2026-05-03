import { Module } from '@nestjs/common';
import { BossesService } from './bosses.service';
import { BossesController } from './bosses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Abilities,
  Abilities_Bosses,
  Bosses,
  Bosses_Attacks,
  Bosses_Resources,
  Weapons_Bosses,
  Resources,
  Weapons,
} from './bosses.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Bosses,
      Abilities_Bosses,
      Abilities,
      Bosses_Attacks,
      Bosses_Resources,
      Weapons_Bosses,
      Resources,
      Weapons,
    ]),
  ],
  providers: [BossesService],
  controllers: [BossesController],
})
export class BossesModule {}
