import { baseUrl } from "@/variables";
import type {
  RecipesList,
  BriefDescriptionBosses,
  NewsList,
  Regions,
  WeaponsList,
  ResourcesGroups,
  ResourcesList,
  EnemiesList,
  SkillsList,
  TypesOfWeaponIds,
  BossesList,
  BossesIds,
  ResourcesInfo,
} from "@/variables";

type GetNews = {
  data: NewsList[];
  totalCount: number;
};

export async function getNews(page: number): Promise<GetNews> {
  const response = await fetch(`${baseUrl}news?page=${page}`);
  const data: GetNews = await response.json();

  return data;
}

export async function getSpecificNews(endpoint: string): Promise<NewsList> {
  const response = await fetch(`${baseUrl}news/${endpoint}`);
  const data = await response.json();
  return data;
}

export async function getRegions(): Promise<Regions> {
  const response = await fetch(`${baseUrl}regions`);
  const data: Regions = await response.json();
  return data;
}

type AllResources = {
  resourcesGroups: ResourcesGroups[];
  resourcesList: ResourcesInfo;
};

export async function getResources(): Promise<AllResources> {
  const response = await fetch(`${baseUrl}resources`);
  const data: AllResources = await response.json();
  console.log(data);
  return data;
}

export type ResourceResponce = {
  id: string;
  enemiesList: EnemiesList;
  resourcesList: ResourcesList;
  createdFromRecepieIds: string[];
  usedForRecepieIds: string[];
  recipesList: RecipesList;
};

export async function getResource(endpoint: string): Promise<ResourceResponce> {
  const response = await fetch(`${baseUrl}resources/${endpoint}`);
  const data: ResourceResponce = await response.json();
  console.log(data);
  return data;
}

type AbilitiesInfo = {
  [ability: string]: {
    id: string;
    title: string;
    img: string;
    notes: string[];
    description: string;
    getByBossId?: string;
    type: string;
    castTime: string;
    subgroup: string;
  };
};

type AbilitiesSubgroups = {
  shapeshiftingPowersIds: string[];
  bloodPowersIds: string[];
};

type Abilities = {
  abilitiesInfo: AbilitiesInfo;
  abilitiesSubgroups: AbilitiesSubgroups;
};

export async function getAbilities(): Promise<Abilities> {
  const response = await fetch(`${baseUrl}abilities`);
  const skills: Abilities = await response.json();
  return skills;
}

type Boss = {
  id: string;
  name: string;
};

export type Ability = {
  id: string;
  title: string;
  img: string;
  notes: string[];
  description: string;
  getByBossId?: string;
  type: string;
  castTime: string;
  subgroup: string;
};

export type AbilityResponce = Ability & {
  boss?: Boss;
};

export async function getAbility(endpoint: string): Promise<AbilityResponce> {
  console.log(endpoint);
  const response = await fetch(`${baseUrl}abilities/${endpoint}`);
  const data: Ability = await response.json();
  return data;
}

type AllWeapons = {
  weaponsList: WeaponsList;
  bossesList: BossesList;
};

export async function getAllWeapons(): Promise<AllWeapons> {
  const response = await fetch(`${baseUrl}/weapons`);
  const data: AllWeapons = await response.json();
  const { weaponsList, bossesList } = data;
  return { weaponsList, bossesList };
}

type SpecificWeapon = {
  weaponsList: WeaponsList;
  searchId: TypesOfWeaponIds;
  bossesList: BossesList;
};

export async function getSpecificWeapon(
  id: TypesOfWeaponIds,
): Promise<SpecificWeapon> {
  const response = await fetch(`${baseUrl}/weapons/${id}`);
  const data: SpecificWeapon = await response.json();
  const { searchId, weaponsList, bossesList } = data;
  return new Promise((resolve) =>
    setTimeout(() => resolve({ searchId, weaponsList, bossesList }), 1000),
  );
}

type BossesData = {
  briefDecriptionBosses: BriefDescriptionBosses;
  bossesList: BossesList;
};

export async function getBriefDescriptionBosses() {
  const response = await fetch(`${baseUrl}/bosses`);
  const data: BossesData = await response.json();
  return data;
}

type SprecificBossInfo = {
  searchId: BossesIds;
  bossesList: BossesList;
  skillsList: SkillsList;
  resourcesList: ResourcesList;
  weaponsList: WeaponsList;
};

export async function getSpecificBoss(
  endpoint: BossesIds,
): Promise<SprecificBossInfo> {
  const response = await fetch(`${baseUrl}/bosses/${endpoint}`);
  const data: SprecificBossInfo = await response.json();
  return data;
}
