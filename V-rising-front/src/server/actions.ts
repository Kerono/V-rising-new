import { baseUrl } from "@/variables";
import type {
  NewsList,
  Regions,
  GetNews,
  ResourceResponce,
  AllResources,
  Weapons,
  Abilities,
  Weapon,
  AbilityResponce,
  BossesList,
  BossResponse,
} from "@/variables";
import { getData } from "@/utils/getData";

export async function getNews(page: number): Promise<GetNews> {
  return getData(`${baseUrl}news?page=${page}`);
}

export async function getSpecificNews(endpoint: string): Promise<NewsList> {
  return getData(`${baseUrl}news/${endpoint}`);
}

export async function getRegions(): Promise<Regions> {
  return getData(`${baseUrl}regions`);
}

export async function getResources(): Promise<AllResources> {
  return getData(`${baseUrl}resources`);
}

export async function getResource(endpoint: string): Promise<ResourceResponce> {
  return getData(`${baseUrl}resources/${endpoint}`);
}

export async function getAbilities(): Promise<Abilities> {
  return getData(`${baseUrl}abilities`);
}

export async function getAbility(endpoint: string): Promise<AbilityResponce> {
  return getData(`${baseUrl}abilities/${endpoint}`);
}

export async function getWeapons(): Promise<Weapons> {
  return getData(`${baseUrl}weapons`);
}

export async function getWeapon(id: string): Promise<Weapon> {
  return getData(`${baseUrl}weapons/${id}`);
}

export async function getBosses(): Promise<BossesList[]> {
  return getData(`${baseUrl}bosses`);
}

export async function getBoss(id: string): Promise<BossResponse> {
  return getData(`${baseUrl}bosses/${id}`);
  // const response = await fetch(`${baseUrl}/bosses/${endpoint}`);
  // const data: SprecificBossInfo = await response.json();
  // return data;
}
