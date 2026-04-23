import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  Bosses,
  Weapons,
  Weapons_Bosses,
  Weapons_Skills,
} from './weapons.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { defaultUrl } from 'src/variables';
import type { WeaponsResp, Weapon, BossesList } from './weapons.types';

@Injectable()
export class WeaponsService {
  constructor(
    @InjectRepository(Weapons)
    private weaponsRepo: Repository<Weapons>,
    @InjectRepository(Weapons_Skills)
    private weaponsSkillsRepo: Repository<Weapons_Skills>,
    @InjectRepository(Weapons_Bosses)
    private weaponsBossesRepo: Repository<Weapons_Bosses>,
    @InjectRepository(Bosses)
    private bossesRepo: Repository<Bosses>,
  ) {}

  async getWeapons(): Promise<WeaponsResp> {
    const weaponsQuery = this.weaponsRepo.createQueryBuilder('weapons');
    const weapons = await weaponsQuery.getMany();

    const weaponsList: WeaponsResp = {};
    for (const weapon of weapons) {
      const { id, name, img } = weapon;
      weaponsList[id] = {
        id,
        name,
        img: `${defaultUrl}images/${img}`,
      };
    }

    const weaponsBossesQuery =
      this.weaponsBossesRepo.createQueryBuilder('weaponsBosses');
    const weaponsBosses = await weaponsBossesQuery.getMany();

    const bosses = await this.getBossesInfo(weaponsBosses);

    for (const boss of weaponsBosses) {
      const { weapon_id, boss_id } = boss;
      const weapon = weaponsList[weapon_id];

      if (!weapon) {
        throw new BadRequestException(`No weapon with id ${weapon_id}`);
      }

      weapon.boss = bosses[boss_id];
    }

    return weaponsList;
  }

  async getBossesInfo(weaponsBosses: Weapons_Bosses[]): Promise<BossesList> {
    const bossesIds: string[] = [];

    for (const boss of weaponsBosses) {
      const { boss_id } = boss;

      if (!bossesIds.includes(boss_id)) {
        bossesIds.push(boss_id);
      }
    }

    const bossesQuery = this.bossesRepo
      .createQueryBuilder('bosses')
      .where('bosses.id IN (:...ids)', {
        ids: bossesIds,
      });
    const bossesInfo = await bossesQuery.getMany();

    const bossesList: BossesList = {};

    for (const boss of bossesInfo) {
      const { id, name } = boss;

      if (!bossesList[id]) {
        bossesList[id] = { id, name };
      }
    }

    return bossesList;
  }

  async getWeapon(id: string): Promise<Weapon> {
    const searchWeapon = await this.weaponsRepo.findOne({
      where: {
        id,
      },
    });

    if (!searchWeapon) {
      throw new NotFoundException(`no such id ${id}`);
    }

    const { id: weaponId, name, description } = searchWeapon;

    const weapon: Weapon = {
      id: weaponId,
      name,
      description,
      skills: [],
    };

    const weaponSkillsQuery = this.weaponsSkillsRepo
      .createQueryBuilder('weaponSkills')
      .where('weaponSkills.weapon_id = :id', { id });
    const weaponSkills = await weaponSkillsQuery.getMany();

    for (const skill of weaponSkills) {
      const {
        id,
        skill_img,
        skill_name,
        description,
        tier_requirements_weapon_name,
        tier_requirements_weapon_img,
      } = skill;

      weapon.skills.push({
        id,
        description,
        skill: {
          img: `${defaultUrl}images/${skill_img}`,
          name: skill_name,
        },
        tierRequirementWeapon: {
          img: `${defaultUrl}images/${tier_requirements_weapon_img}`,
          name: tier_requirements_weapon_name,
        },
      });
    }

    const getFromBoss = await this.weaponsBossesRepo.findOne({
      where: {
        weapon_id: id,
      },
    });

    if (getFromBoss) {
      const boss = await this.getBossesInfo([getFromBoss]);
      const bossName = getFromBoss.boss_id;
      weapon.boss = boss[bossName];
    }

    return weapon;
  }
}
