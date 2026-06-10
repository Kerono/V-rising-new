import { CSSProperties, ReactNode } from "react";

export const inDevelopment = process.env.NODE_ENV === "development";

type CssVariables = {
  "--text-color": string;
  "--background": string;
  "--header-links-hover": string;
} & CSSProperties;

export const darkThemeStyles: CssVariables = {
  ["--text-color"]: "white",
  ["--background"]: "#1d1c1c",
  ["--header-links-hover"]: "#d93e3e",
};

export const lightThemeStyles: CssVariables = {
  ["--text-color"]: "black",
  ["--background"]: "white",
  ["--header-links-hover"]: "darkgoldenrod",
};

export const newsPerPage = 4;

export const linksData: LinksData[] = [
  {
    content: "Home",
    href: "/",
  },
  {
    content: "Regions",
    href: "/regions",
  },
  {
    content: "Resources",
    href: "/resources",
  },
  {
    content: "Abilities",
    href: "/abilities",
  },
  {
    content: "Weapons",
    href: "/weapons",
  },
  {
    content: "Blood carriers V",
    href: "/blood-carriers",
  },
];

export type LinksData = {
  href: string;
  content: string;
};

export type Info = {
  title: string;
  value: ReactNode;
};

export type NewsList = {
  id: string;
  title: string;
  info: string;
  img: string;
};

export type GetNews = {
  data: NewsList[];
  totalCount: number;
};

export type Regions = {
  img: string;
  data: {
    id: string;
    title: string;
    content: string;
  }[];
};

export type ResourcesGroups = {
  title: string;
  ids: string[];
};

export type AllResources = {
  resourcesGroups: ResourcesGroups[];
  resourcesList: ResourcesInfo;
};

export type ResourceResponce = {
  id: string;
  enemiesList: EnemiesList;
  resourcesList: ResourcesList;
  createdFromRecepieIds: string[];
  usedForRecepieIds: string[];
  recipesList: RecipesList;
};

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

export type Abilities = {
  abilitiesInfo: AbilitiesInfo;
  abilitiesSubgroups: AbilitiesSubgroups;
};

type Enemy = {
  name: string;
  id: string;
};

export type EnemiesList = {
  [keys: string]: Enemy;
};

export type RecipesList = {
  [recipeName: string]: {
    createFromIds: string[];
    resultId: string[];
  };
};

export type ResourcesFullDetails = {
  name: string;
  img: string;
  id: string;
  description: string;
  category: string;
  isTeleportable: boolean;
  stackSize: number;
  enemiesListIds: string[];
};

export type ResourcesInfo = {
  [id: string]: ResourcesFullDetails;
};

export type ResourcesList = {
  [id: string]: ResourcesFullDetails;
};

export type WeaponSkills = {
  id: string;
  skill: WeaponSkill;
  description: string;
  tierRequirementWeapon: TierWeaponInfo;
};

type WeaponSkill = {
  img: string;
  name: string;
};

type TierWeaponInfo = WeaponSkill;

export type Boss = {
  id: string;
  name: string;
};

type Ability = {
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

type WeaponContent = {
  id: string;
  name: string;
  img: string;
  boss?: {
    id: string;
    name: string;
  };
};

export type Weapons = {
  [key: string]: WeaponContent;
};

export type Weapon = {
  id: string;
  name: string;
  boss?: Boss;
  description: string;
  skills: WeaponSkills[];
};

export type BossesList = {
  id: string;
  name: string;
  location: string;
  locations_details: string;
};

export type BossResponse = {
  id: string;
  name: string;
  description: string;
  location: string;
  locations_details: string;
  img: string;
  level: number;
  ability?: Details;
  weaponsRecipe?: Details;
  resources: Details[];
  attacks: string[];
};

export type Details = { id: string; name: string; img: string };
