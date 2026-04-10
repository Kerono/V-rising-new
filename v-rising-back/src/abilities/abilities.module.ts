import { Module } from '@nestjs/common';
import { AbilitiesController } from './abilities.controller';
import { AbilitiesService } from './abilities.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Abilities,
  Abilities_Notes,
  Abilities_Bosses,
  Bosses,
} from './abilities.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Abilities,
      Abilities_Notes,
      Abilities_Bosses,
      Bosses,
    ]),
  ],
  controllers: [AbilitiesController],
  providers: [AbilitiesService],
})
export class AbilitiesModule {}
