type WeaponsListContent = {
  id: string;
  name: string;
  img: string;
  boss?: Boss;
};

type Boss = {
  id: string;
  name: string;
};

export type WeaponsResp = {
  [key: string]: WeaponsListContent;
};

export type Weapon = {
  id: string;
  name: string;
  boss?: Boss;
  description: string;
  skills: WeaponSkills[];
};

type WeaponSkills = {
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

export type BossesList = { [bossId: string]: { id: string; name: string } };
