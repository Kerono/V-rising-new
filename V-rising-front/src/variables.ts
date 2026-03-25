import { CSSProperties } from "react";

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

export const baseUrl = "http://localhost:3000/";

export const newsPerPage = 4;

type TierWeaponInfo = {
  img: string;
  info: string;
};

type WeaponSkill = TierWeaponInfo;

type WeaponSkillsIds =
  | "whirlwind"
  | "shockwave"
  | "primary"
  | "frenzy"
  | "x-strike"
  | "crushing-blow"
  | "smack"
  | "a-thousand-spears"
  | "harpoon"
  | "tendon-swing"
  | "howling-reaper"
  | "great-cleaver"
  | "death-from-above"
  | "rain-of-bolts"
  | "snapshot"
  | "multishot"
  | "guided-arrow"
  | "throw-dagger"
  | "rain-of-daggers"
  | "release-daggers";

type Skills = {
  id: WeaponSkillsIds;
  skill: WeaponSkill;
  description: string;
  cooldown?: string;
  tierRequirement: TierWeaponInfo;
};

type WeaponsListContent = {
  id: TypesOfWeaponIds;
  title: string;
  type: "melee" | "range";
  img: string;
  needReceiving: boolean;
  additionalCondition?: BossesIds;
  bossId?: BossesIds;
  bonuses: string;
  skills: Skills[];
};

export type TypesOfWeaponIds =
  | "sword"
  | "axes"
  | "mace"
  | "spear"
  | "greatsword"
  | "crossbow"
  | "longbow"
  | "dagger";

export type WeaponsList = {
  [key in TypesOfWeaponIds]: WeaponsListContent;
};

export type NewsList = {
  id: NewsIds;
  title: string;
  //TODO на главное странице не используется но передается, оставлять?
  info: string;
  img: string;
};

export type NewsIds =
  | "invaders-of-oakveil"
  | "dev-update-30"
  | "update-1.1"
  | "invaders-of-oakveil-start-date"
  | "dev-update-29"
  | "dev-update-28"
  | "art-contest-winners"
  | "invaders-of-oakveil-gameplay";

export type Regions = {
  img: string;
  data: {
    id: string;
    title: string;
    content: string;
  }[];
};

type Item = {
  name: string;
  img: string;
  id: ResourceIds;
  description: string;
};

export type ResourceIds =
  | "simple-wood"
  | "hallow-wood"
  | "simple-stone"
  | "stone-dust"
  | "copper-ore"
  | "iron-ore"
  | "plank"
  | "sawdust"
  | "oil"
  | "fish-bone"
  | "fish"
  | "whetstone"
  | "copper-ingot"
  | "iron-ingot"
  | "reinforced-plank"
  | "bone"
  | "grave-dust"
  | "rugged-hide"
  | "leather";

export type ResourcesGroups = {
  title: string;
  ids: ResourceIds[];
};

type EnemiesIds =
  | "treant"
  | "flesh-golem"
  | "emery-golem"
  | "iron-golem"
  | "stone-golem"
  | "blood-elemental"
  | "skeleton"
  | "banshee"
  | "ghoul"
  | "bear";

type Enemy = {
  name: string;
  id: EnemiesIds;
};

export type EnemiesList = {
  [keys in EnemiesIds]: Enemy;
};

type Caregory = "Material" | "Alchemy" | "Fish" | "Tailoring";

export type RecipesList = {
  recipe: ResourceIds[];
  resultItems: ResourceIds[];
};

type ResourcesRecipesIds =
  | "simple-wood-recipe"
  | "hallow-wood-recipe"
  | "simple-stone-recipe"
  | "stone-dust-recipe"
  | "copper-ore-recipe"
  | "iron-ore-recipe"
  | "plank-recipe"
  | "sawdust-recipe"
  | "oil-recipe"
  | "fish-bone-recipe"
  | "fish-recipe"
  | "whetstone-recipe"
  | "copper-ingot-recipe"
  | "iron-ingot-recipe"
  | "reinforced-plank-recipe"
  | "bone-recipe"
  | "grave-dust-recipe"
  | "rugged-hide-recipe"
  | "leather-recipe";

export type ResourcesFullInfo = Item & {
  category: Caregory;
  isTeleportable: boolean;
  stackSize: number;
  groups: {
    enemiesList: EnemiesIds[];
    //TODO dont know mby dont needed cause cant see where used
    resoursesList: ResourcesRecipesIds;
  };
};

export type BriefResourcesInfo = {
  [id in ResourceIds]: Item;
};

export type ResourcesList = {
  [id in ResourceIds]: ResourcesFullInfo;
};

type ShapeshiftingPowersIds = "wolf-form" | "bear-form" | "rat-form";
type BloodPowers = "expose-vein" | "blood-mend" | "blood-hunger";
type StaticSkillsBriefDecriptionIds = "abilitiesInfo" | "weaponsSkills";

export type SkillsBriefDescription = {
  staticInfo: {
    [key in StaticSkillsBriefDecriptionIds]: {
      title: "Abilities" | "Weapon Skills";
      description: string;
    };
  };
  abilities: {
    "shapeshifting-powers": {
      title: "Shapeshifting Powers";
      vampirePowerIds: ShapeshiftingPowersIds[];
    };
    "blood-powers": {
      title: "Blood Powers";
      vampirePowerIds: BloodPowers[];
    };
  };
};

export type SkillsFullInfoIds = ShapeshiftingPowersIds | BloodPowers;

type Skill = {
  id: SkillsFullInfoIds;
  title: string;
  img: string;
  description: string;
  unlock?: BossesIds;
  type: string;
  castTime: string;
  notes?: {
    title: string;
    content: string[];
  };
};

export type SkillsList = {
  [key in SkillsFullInfoIds]: Skill;
};

type Bosses = {
  id: BossesIds;
  title: string;
  img: string;
  description: string;
  location: string;
  level: number;
  rewards: {
    skills?: SkillsFullInfoIds[];
    drop: ResourceIds[];
    recipes?: TypesOfWeaponIds[];
  };
  attacks: string[];
  region: string;
};

export type BossesIds =
  | "tristan-the-vampire-hunter"
  | "alpha-the-white-wolf"
  | "keely-the-frost-archer"
  | "kodia-the-ferocious-bear"
  | "nibbles-the-putrid-rat"
  | "rufus-the-foreman"
  | "lidia-the-chaos-archer"
  | "bane-the-shadowblade";

export type BriefDescriptionBosses = {
  title: "V Blood Carriers";
  description: string;
  bosesIds: BossesIds[];
};

export type BossesList = {
  [key in BossesIds]: Bosses;
};
