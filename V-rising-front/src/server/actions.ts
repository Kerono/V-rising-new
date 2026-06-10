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
  return getData(`news?page=${page}`);
}

export async function getSpecificNews(endpoint: string): Promise<NewsList> {
  return getData(`news/${endpoint}`);
}

export async function getRegions(): Promise<Regions> {
  return getData("regions");
}

export async function getResources(): Promise<AllResources> {
  return getData("resources");
}

export async function getResource(endpoint: string): Promise<ResourceResponce> {
  return getData(`resources/${endpoint}`);
}

export async function getAbilities(): Promise<Abilities> {
  return getData("abilities");
}

export async function getAbility(endpoint: string): Promise<AbilityResponce> {
  return getData(`abilities/${endpoint}`);
}

export async function getWeapons(): Promise<Weapons> {
  return getData("weapons");
}

export async function getWeapon(id: string): Promise<Weapon> {
  return getData(`weapons/${id}`);
}

export async function getBosses(): Promise<BossesList[]> {
  return getData("bosses");
}

export async function getBoss(id: string): Promise<BossResponse> {
  return getData(`bosses/${id}`);
}
