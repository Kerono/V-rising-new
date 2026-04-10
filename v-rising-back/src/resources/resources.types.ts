export type ResourcesList = {
  [id: string]: ResourcesFullInfo;
};

export type ResourcesGroups = {
  ids: string[];
  title: string;
};

export type AllResourcesResp = {
  resourcesList: ResourcesList;
  resourcesGroups: ResourcesGroups[];
};

export type ResourcesFullInfo = {
  name: string;
  img: string;
  id: string;
  description: string;
  category: string;
  isTeleportable: boolean;
  stackSize: number;
  enemiesListIds: string[];
};

export type EnemiesList = {
  [enemiesId: string]: {
    name: string;
    id: string;
  };
};

export type RecipesResponce = {
  createdFromRecepieIds: string[];
  usedForRecepieIds: string[];
  recipesList: RecipesList;
};

export type ResourceResponce = RecipesResponce & {
  id: string;
  enemiesList: EnemiesList;
  resourcesList: ResourcesList;
};

export type RecipesList = {
  [recipeName: string]: {
    createFromIds: string[];
    resultId: string[];
  };
};
