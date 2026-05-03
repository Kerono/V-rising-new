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

type Details = { id: string; name: string; img: string };
