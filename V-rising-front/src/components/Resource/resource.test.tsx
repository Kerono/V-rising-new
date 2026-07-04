import { render, screen } from "@testing-library/react";
import { Resource } from "./Resource";
import type { Props as ResourceProps } from "./Resource";

const resource: ResourceProps = {
  id: "simple-wood",
  enemiesList: {
    treant: {
      id: "treant",
      name: "Treant",
    },
  },
  resourcesList: {
    plank: {
      id: "plank",
      name: "Plank",
      category: "Woods",
      description: "Plank is a common resource used for Weapons",
      enemiesListIds: [],
      img: "plank.webp",
      isTeleportable: true,
      stackSize: 250,
    },
    sawdust: {
      id: "sawdust",
      name: "Sawdust",
      category: "Woods",
      description: "Sawdust is a resource in V Rising",
      enemiesListIds: [],
      img: "sawdust.webp",
      isTeleportable: true,
      stackSize: 250,
    },
    "simple-wood": {
      id: "simple-wood",
      name: "Wood",
      category: "Woods",
      description: "Wood is a core resource",
      enemiesListIds: ["treant"],
      img: "simple-wood.webp",
      isTeleportable: true,
      stackSize: 1000,
    },
  },
  recipesList: {
    "simple-wood-recipe": {
      createFromIds: ["simple-wood"],
      resultId: ["plank", "sawdust"],
    },
  },
};

const { id, enemiesList, resourcesList, recipesList } = resource;

describe("regions", () => {
  it("regions render correctly", async () => {
    render(
      <Resource
        id={id}
        enemiesList={enemiesList}
        resourcesList={resourcesList}
        recipesList={recipesList}
      />,
    );

    const titles = await screen.findAllByText(
      resourcesList["simple-wood"].name,
    );
    expect(titles.length).toBeGreaterThan(0);
    const description = await screen.findByText(
      resourcesList["simple-wood"].description,
    );
    expect(description).toBeTruthy();
    const enemy = await screen.findByText(enemiesList.treant.name);
    expect(enemy).toBeTruthy();
    const plank = await screen.findByText(resourcesList.plank.name);
    expect(plank).toBeTruthy();
    const sawdust = await screen.findByText(resourcesList.sawdust.name);
    expect(sawdust).toBeTruthy();
    const card = await screen.findByRole("card");
    expect(card).toBeTruthy();
  });
});
