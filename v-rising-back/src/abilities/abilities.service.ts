import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Abilities,
  Abilities_Bosses,
  Abilities_Notes,
  Bosses,
} from './abilities.entity';
import { Repository } from 'typeorm';
import type {
  AbilitiesInfo,
  AbilitiesSubgroups,
  AbilitiesResponce,
  AbilityResponce,
} from './abilities.types';

@Injectable()
export class AbilitiesService {
  constructor(
    @InjectRepository(Abilities)
    private abilitiesRepository: Repository<Abilities>,
    @InjectRepository(Abilities_Bosses)
    private abilitiesBossesRepository: Repository<Abilities_Bosses>,
    @InjectRepository(Abilities_Notes)
    private abilitiesNotesRepository: Repository<Abilities_Notes>,
    @InjectRepository(Bosses)
    private bossesRepository: Repository<Bosses>,
  ) {}

  async getAbilities(): Promise<AbilitiesResponce> {
    const abilitiesQuery =
      this.abilitiesRepository.createQueryBuilder('abilities');
    const abilities = await abilitiesQuery.getMany();

    const abilitiesInfo: AbilitiesInfo = {};

    const allSubgroups: {
      [key: string]: string[];
    } = {};

    for (const ability of abilities) {
      const { id, title, img, description, type, cast_time, subgroup } =
        ability;
      abilitiesInfo[id] = {
        id,
        title,
        img,
        description,
        type,
        castTime: cast_time,
        notes: [],
        subgroup,
      };

      if (!allSubgroups[subgroup]) {
        allSubgroups[subgroup] = [];
      }

      allSubgroups[subgroup].push(id);
    }

    const abilitiesSubgroups: AbilitiesSubgroups = {
      shapeshiftingPowersIds: allSubgroups['shapeshifting-powers'],
      bloodPowersIds: allSubgroups['blood-powers'],
    };

    const abilitiesNotesQuery =
      this.abilitiesNotesRepository.createQueryBuilder('abilities_notes');
    const abilitiesNotes = await abilitiesNotesQuery.getMany();

    for (const note of abilitiesNotes) {
      const { ability_id, description } = note;

      const ability = abilitiesInfo[ability_id];

      if (!ability) {
        throw new BadRequestException(`No item with id ${ability_id}`);
      }

      ability.notes.push(description);
    }

    const abilitiesBossesQuery =
      this.abilitiesBossesRepository.createQueryBuilder('abilities_bosses');
    const abilitiesBosses = await abilitiesBossesQuery.getMany();

    for (const bosses of abilitiesBosses) {
      const { ability_id, boss_id } = bosses;

      const ability = abilitiesInfo[ability_id];

      if (!ability) {
        throw new BadRequestException(`No item with id ${ability_id}`);
      }

      ability.getByBossId = boss_id;
    }

    return { abilitiesInfo, abilitiesSubgroups };
  }

  async getAbility(id: string): Promise<AbilityResponce> {
    const ability = await this.abilitiesRepository.findOne({
      where: { id },
    });

    if (!ability) {
      throw new NotFoundException(`no such id ${id}`);
    }

    const {
      id: abilityId,
      title,
      img,
      description,
      type,
      cast_time,
      subgroup,
    } = ability;

    const abilityResponce: AbilityResponce = {
      id: abilityId,
      title,
      img,
      description,
      type,
      castTime: cast_time,
      notes: [],
      subgroup,
    };

    const abilitiesNotesQuery = this.abilitiesNotesRepository
      .createQueryBuilder('abilityNotes')
      .where('abilityNotes.ability_id = :id', { id });
    const abilitiesNotes = await abilitiesNotesQuery.getMany();

    for (const note of abilitiesNotes) {
      abilityResponce.notes.push(note.description);
    }

    const abilitiesBosses = await this.abilitiesBossesRepository.findOne({
      where: { ability_id: id },
    });

    if (abilitiesBosses) {
      const { boss_id } = abilitiesBosses;
      abilityResponce.getByBossId = boss_id;
      const bossInfo = await this.bossesRepository.findOne({
        where: { id: boss_id },
      });

      if (!bossInfo) {
        throw new NotFoundException(`no such boss id ${boss_id}`);
      }

      const { id, name } = bossInfo;
      abilityResponce.boss = { id, name };
    }

    return abilityResponce;
  }
}
