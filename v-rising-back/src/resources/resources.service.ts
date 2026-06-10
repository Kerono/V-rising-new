import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Resources,
  Resources_Enemies,
  Resources_Categories,
  Recipes,
  Enemies,
} from './resources.entity';
import type {
  AllResourcesResp,
  ResourcesFullInfo,
  ResourcesGroups,
  ResourceResponce,
  EnemiesList,
  RecipesResponce,
  ResourcesList,
} from './resources.types';
import { clearDuplicates } from '../utils/helpers';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Resources)
    private resourcesRepository: Repository<Resources>,
    @InjectRepository(Resources_Enemies)
    private resourcesEnemiesRepository: Repository<Resources_Enemies>,
    @InjectRepository(Resources_Categories)
    private resourcesCategoriesRepository: Repository<Resources_Categories>,
    @InjectRepository(Recipes)
    private recipesRepository: Repository<Recipes>,
    @InjectRepository(Enemies)
    private enemiesRepository: Repository<Enemies>,
  ) {}

  async getResources(): Promise<AllResourcesResp> {
    const resourcesQuery =
      this.resourcesRepository.createQueryBuilder('resource');
    const resources = await resourcesQuery.getMany();

    const resourcesCategoriesQuery =
      this.resourcesCategoriesRepository.createQueryBuilder('categories');

    const resourcesCategories = await resourcesCategoriesQuery.getMany();

    const resourcesList: { [id: string]: ResourcesFullInfo } = {};

    for (const item of resources) {
      const {
        id,
        name,
        category_id,
        is_teleportable,
        stack_size,
        description,
        img,
      } = item;

      const category = resourcesCategories.find(
        (caregorie) => caregorie.id === category_id,
      );

      if (category === undefined) {
        throw new BadRequestException('Something bad happened');
      }

      resourcesList[id] = {
        id,
        name,
        description,
        img,
        category: category.name,
        isTeleportable: is_teleportable,
        stackSize: stack_size,
        enemiesListIds: [],
      };
    }

    const resourcesEnemiesQuery =
      this.resourcesEnemiesRepository.createQueryBuilder('resourceEnemy');

    const allResourcesEnemies = await resourcesEnemiesQuery.getMany();

    for (const resourceEnemy of allResourcesEnemies) {
      const { enemy_id, resource_id } = resourceEnemy;

      const item = resourcesList[resource_id];

      if (!item) {
        throw new BadRequestException(`No item with id ${resource_id}`);
      }

      item.enemiesListIds.push(enemy_id);
    }

    const resourcesMap: { [categoryId: string]: string[] } = {};

    for (const { id } of resourcesCategories) {
      resourcesMap[id] = [];
    }

    for (const item of resources) {
      resourcesMap[item.category_id].push(item.id);
    }

    const resourcesGroups: ResourcesGroups[] = resourcesCategories.map(
      (category) => ({
        title: category.name,
        ids: resourcesMap[category.id],
      }),
    );

    return { resourcesList, resourcesGroups };
  }

  async getRecepiesInfo(
    id: string,
  ): Promise<{ recipesInfo: RecipesResponce; usedRecipes: Recipes[] }> {
    const recipesQuery = this.recipesRepository
      .createQueryBuilder('resipes')
      .where('resipes.result_id = :id', { id })
      .orWhere('resipes.create_from_id = :id', { id });

    const allRecipiesById = await recipesQuery.getMany();

    const recipesResponse: RecipesResponce = {
      createdFromRecepieIds: [],
      usedForRecepieIds: [],
      recipesList: {},
    };

    for (const recipe of allRecipiesById) {
      const recipeId = recipe.recipe_id;
      const { createdFromRecepieIds, usedForRecepieIds } = recipesResponse;
      if (
        recipe.result_id === id &&
        !createdFromRecepieIds.includes(recipeId)
      ) {
        createdFromRecepieIds.push(recipeId);
      }
      if (
        recipe.create_from_id === id &&
        !usedForRecepieIds.includes(recipeId)
      ) {
        usedForRecepieIds.push(recipeId);
      }
    }

    const recepiesIdsToQuery = clearDuplicates([
      ...recipesResponse.createdFromRecepieIds,
      ...recipesResponse.usedForRecepieIds,
    ]);

    if (recepiesIdsToQuery.length == 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const queryByRecipeId = this.recipesRepository
      .createQueryBuilder('recipes')
      .where('recipes.recipe_id IN (:...ids)', {
        ids: recepiesIdsToQuery,
      });
    const usedRecipes = await queryByRecipeId.getMany();
    const recipesList = recipesResponse.recipesList;

    for (const recipe of usedRecipes) {
      const { recipe_id, create_from_id, result_id } = recipe;
      if (!recipesList[recipe_id]) {
        recipesList[recipe_id] = {
          createFromIds: [],
          resultId: [],
        };
      }
      const { createFromIds, resultId } = recipesList[recipe_id];

      if (!createFromIds.includes(create_from_id)) {
        createFromIds.push(create_from_id);
      }

      if (!resultId.includes(result_id)) {
        resultId.push(result_id);
      }
    }

    return { usedRecipes, recipesInfo: recipesResponse };
  }

  async getResorsesInfo(
    resourceId: string,
    usedRecipes: Recipes[],
  ): Promise<{
    resourcesList: ResourcesList;
    allResourcesEnemies: Resources_Enemies[];
  }> {
    const uniqueResourcesIds: string[] = [];

    for (const recipe of usedRecipes) {
      const { create_from_id, result_id } = recipe;
      if (!uniqueResourcesIds.includes(create_from_id)) {
        uniqueResourcesIds.push(create_from_id);
      }
      if (!uniqueResourcesIds.includes(result_id)) {
        uniqueResourcesIds.push(result_id);
      }
    }

    const resourceQueryByIds = this.resourcesRepository
      .createQueryBuilder('resources')
      .where('resources.id IN (:...ids)', {
        ids: uniqueResourcesIds,
      });

    const allResourceByIds = await resourceQueryByIds.getMany();

    const resourcesCategories =
      this.resourcesCategoriesRepository.createQueryBuilder('categories');
    const allResourcesCategories = await resourcesCategories.getMany();

    const resourcesList: { [id: string]: ResourcesFullInfo } = {};

    for (const item of allResourceByIds) {
      const {
        id,
        name,
        category_id,
        is_teleportable,
        stack_size,
        description,
        img,
      } = item;

      const category = allResourcesCategories.find(
        (caregorie) => caregorie.id === category_id,
      );

      if (category === undefined) {
        throw new BadRequestException('Something bad happened');
      }

      resourcesList[id] = {
        id,
        name,
        description,
        img,
        category: category.name,
        isTeleportable: is_teleportable,
        stackSize: stack_size,
        enemiesListIds: [],
      };
    }

    const resourcesEnemiesQuery = this.resourcesEnemiesRepository
      .createQueryBuilder('resourceEnemy')
      .where('resourceEnemy.resource_id = :id', {
        id: resourceId,
      });

    const allResourcesEnemies = await resourcesEnemiesQuery.getMany();

    for (const resourceEnemy of allResourcesEnemies) {
      const { enemy_id, resource_id } = resourceEnemy;

      const item = resourcesList[resource_id];

      if (!item) {
        throw new Error(`No item with id ${resource_id}`);
      }

      item.enemiesListIds.push(enemy_id);
    }

    return { resourcesList, allResourcesEnemies };
  }

  async getEnemiesInfo(
    allResourcesEnemies: Resources_Enemies[],
  ): Promise<EnemiesList> {
    const uniqueEnemiesIds: string[] = [];

    for (const enemy of allResourcesEnemies) {
      const { enemy_id } = enemy;

      if (!uniqueEnemiesIds.includes(enemy_id)) {
        uniqueEnemiesIds.push(enemy_id);
      }
    }

    const enemiesQuery = this.enemiesRepository.createQueryBuilder('enemies');

    let allEnemies: Enemies[] = [];
    if (uniqueEnemiesIds.length > 0) {
      enemiesQuery.where('enemies.id IN (:...ids)', {
        ids: uniqueEnemiesIds,
      });
      allEnemies = await enemiesQuery.getMany();
    }

    const enemiesList: EnemiesList = {};
    for (const enemy of allEnemies) {
      const { id, name } = enemy;
      enemiesList[id] = {
        id,
        name,
      };
    }
    return enemiesList;
  }

  async getResource(id: string): Promise<ResourceResponce> {
    const { usedRecipes, recipesInfo } = await this.getRecepiesInfo(id);

    const { resourcesList, allResourcesEnemies } = await this.getResorsesInfo(
      id,
      usedRecipes,
    );

    const enemiesList = await this.getEnemiesInfo(allResourcesEnemies);

    const { createdFromRecepieIds, usedForRecepieIds, recipesList } =
      recipesInfo;

    return {
      id,
      createdFromRecepieIds,
      usedForRecepieIds,
      recipesList,
      resourcesList,
      enemiesList,
    };
  }
}
