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
  SkillsBriefDescription,
  SkillsList,
  TypesOfWeaponIds,
  SkillsFullInfoIds,
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
  if (!response.ok) {
    throw response.json();
  }

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

//TODO rename
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

type SkillsData = {
  skillsBriefDescription: SkillsBriefDescription;
  skillsList: SkillsList;
};

export async function getAllSkills(): Promise<SkillsData> {
  const response = await fetch(`${baseUrl}/skills-list`);
  const data: SkillsData = await response.json();
  const { skillsBriefDescription, skillsList } = data;
  return { skillsBriefDescription, skillsList };
}

type SpecificSkill = {
  skillsList: SkillsList;
  searchId: SkillsFullInfoIds;
  bossesList: BossesList;
};

export async function getSpecificSkill(
  endpoint: SkillsFullInfoIds,
): Promise<SpecificSkill> {
  const response = await fetch(`${baseUrl}/skills-list/${endpoint}`);
  const data: SpecificSkill = await response.json();
  const { skillsList, searchId, bossesList } = data;
  return { skillsList, searchId, bossesList };
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
