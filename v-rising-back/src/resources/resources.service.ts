import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Resources,
  Resources_Enemies,
  Resources_Categories,
} from './resources.entity';
import { defaultUrl } from 'src/news/news.service';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Resources)
    private resourcesRepository: Repository<Resources>,
    @InjectRepository(Resources_Enemies)
    private resourcesEnemiesRepository: Repository<Resources_Enemies>,
    @InjectRepository(Resources_Categories)
    private resourcesCategories: Repository<Resources_Categories>,
  ) {}
  // : Promise<Resp>
  async getAllResources(): Promise<Resp> {
    const resources = this.resourcesRepository.createQueryBuilder('item');
    const resourcesCategories =
      this.resourcesCategories.createQueryBuilder('categories');

    const allResourcesCategories = await resourcesCategories.getMany();
    const allResources = await resources.getMany();

    const resourcesEnemiesQuery =
      this.resourcesEnemiesRepository.createQueryBuilder('resourceEnemy');

    //TODO get only enemies included in items
    // const resourceIds = allResources.map((i) => i.id);
    // const resourcesEnemiesQuery =
    //   this.resourcesEnemiesRepository.createQueryBuilder('resourceEnemy');
    // .where('resourceEnemy.resource_id IN (:...ids)', { ids: resourceIds });

    const allResourcesEnemies = await resourcesEnemiesQuery.getMany();
    console.log(allResourcesEnemies.length);

    const resourcesList: { [id: string]: ResourcesFullInfo } = {};

    for (const item of allResources) {
      const {
        id,
        name,
        category_id,
        is_teleportable,
        stack_size,
        description,
        img,
      } = item;

      //TODO try make better?
      const category =
        allResourcesCategories?.find(
          (caregorie) => caregorie.id === category_id,
        )?.name || '';

      resourcesList[id] = {
        id,
        name,
        description,
        img: `${defaultUrl}images/${img}`,
        category,
        isTeleportable: is_teleportable,
        stackSize: stack_size,
        enemiesListIds: [],
      };
    }

    for (const resourceEnemy of allResourcesEnemies) {
      const { enemy_id, resource_id } = resourceEnemy;

      const item = resourcesList[resource_id];

      if (!item) {
        throw new Error(`No item with id ${resource_id}`);
      }

      item.enemiesListIds.push(enemy_id);
    }

    const resourcesMap: { [categoryId: string]: string[] } = {};

    for (const { id } of allResourcesCategories) {
      resourcesMap[id] = [];
    }
    console.log(resourcesMap, 'f');
    for (const item of allResources) {
      resourcesMap[item.category_id].push(item.id);
    }
    console.log(resourcesMap, 's');
    const resourcesGroupsResp: ResourcesGroups[] = allResourcesCategories.map(
      (category) => ({
        title: category.name,
        ids: resourcesMap[category.id],
      }),
    );

    return { resourcesList, resourcesGroups: resourcesGroupsResp };
  }
}

export type ResourcesList = {
  [id: string]: ResourcesFullInfo;
};

type Resp = {
  resourcesList: ResourcesList;
  resourcesGroups: ResourcesGroups[];
};
export type ResourcesFullInfo = {
  name: string;
  img: string;
  id: string;
  description: string;
  category: string;
  isTeleportable: boolean;
  stackSize: number;
  enemiesListIds: string[];
};

type ResourcesGroups = {
  ids: string[];
  title: string;
};
