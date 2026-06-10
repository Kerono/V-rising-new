import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Bosses,
  Abilities_Bosses,
  Abilities,
  Bosses_Attacks,
  Bosses_Resources,
  Weapons_Bosses,
  Resources,
  Weapons,
} from './bosses.entity';
import { Repository } from 'typeorm';
import type { BossesList, BossResponse } from './bosses.types';

@Injectable()
export class BossesService {
  constructor(
    @InjectRepository(Bosses)
    private bossesRepository: Repository<Bosses>,
    @InjectRepository(Abilities_Bosses)
    private abilitiesBossesRepository: Repository<Abilities_Bosses>,
    @InjectRepository(Abilities)
    private abilitiesRepository: Repository<Abilities>,
    @InjectRepository(Bosses_Attacks)
    private bossesAttacksRepository: Repository<Bosses_Attacks>,
    @InjectRepository(Bosses_Resources)
    private bossesResourcesRepository: Repository<Bosses_Resources>,
    @InjectRepository(Resources)
    private resourcesRepository: Repository<Resources>,
    @InjectRepository(Weapons_Bosses)
    private weaponsBossesRepository: Repository<Weapons_Bosses>,
    @InjectRepository(Weapons)
    private weaponsRepository: Repository<Weapons>,
  ) {}

  async getBosses() {
    const bossesQuery = this.bossesRepository.createQueryBuilder('bosses');
    const bosses = await bossesQuery.getMany();

    const bossesList: BossesList[] = [];

    for (const boss of bosses) {
      const { id, name, location, locations_details } = boss;
      bossesList.push({ id, name, location, locations_details });
    }

    return bossesList;
  }

  async getBoss(id: string) {
    const boss = await this.bossesRepository.findOne({ where: { id } });

    if (!boss) {
      throw new NotFoundException(`no such boss id ${id}`);
    }

    const {
      id: bossId,
      name,
      description,
      location,
      locations_details,
      img,
      level,
    } = boss;

    const bossResponse: BossResponse = {
      id: bossId,
      name,
      description,
      location,
      locations_details,
      img,
      level,
      attacks: [],
      resources: [],
    };

    const abilityBosses = await this.abilitiesBossesRepository.findOne({
      where: { boss_id: id },
    });

    if (abilityBosses) {
      const { ability_id } = abilityBosses;

      const ability = await this.abilitiesRepository.findOne({
        where: { id: ability_id },
      });

      if (!ability) {
        throw new NotFoundException(`no such ability ${ability_id}`);
      }

      const { id, title, img } = ability;
      bossResponse.ability = {
        id,
        name: title,
        img,
      };
    }

    const bossesAttackQuery = this.bossesAttacksRepository
      .createQueryBuilder('bossesAttacks')
      .where({ boss_id: bossId });
    const bossesAttacks = await bossesAttackQuery.getMany();

    for (const attack of bossesAttacks) {
      const { description } = attack;
      bossResponse.attacks.push(description);
    }

    const bossesResourcesQuery = this.bossesResourcesRepository
      .createQueryBuilder('bossesResources')
      .where({ boss_id: bossId });
    const bossesResources = await bossesResourcesQuery.getMany();

    const resourcesKeys = bossesResources.map(
      (resource) => resource.resource_id,
    );

    const resourcesQuery = this.resourcesRepository
      .createQueryBuilder('resources')
      .where('resources.id IN (:...ids)', { ids: resourcesKeys });

    const resources = await resourcesQuery.getMany();

    for (const resource of resources) {
      const { id, name, img } = resource;
      bossResponse.resources.push({
        id,
        name,
        img,
      });
    }

    const weaponsFromBoss = await this.weaponsBossesRepository.findOne({
      where: { boss_id: id },
    });

    if (weaponsFromBoss) {
      const { weapon_id } = weaponsFromBoss;
      const weaponInfo = await this.weaponsRepository.findOne({
        where: { id: weapon_id },
      });

      if (!weaponInfo) {
        throw new NotFoundException(`no such id ${weapon_id}`);
      }

      const { id, name, img } = weaponInfo;

      bossResponse.weaponsRecipe = {
        id,
        name,
        img,
      };
    }

    return bossResponse;
  }
}
