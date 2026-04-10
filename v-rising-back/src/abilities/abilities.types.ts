export type AbilitiesInfo = {
  [ability: string]: Ability;
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

export type AbilitiesSubgroups = {
  shapeshiftingPowersIds: string[];
  bloodPowersIds: string[];
};

export type AbilitiesResponce = {
  abilitiesInfo: AbilitiesInfo;
  abilitiesSubgroups: AbilitiesSubgroups;
};

type Boss = {
  id: string;
  name: string;
};

export type AbilityResponce = Ability & {
  boss?: Boss;
};
