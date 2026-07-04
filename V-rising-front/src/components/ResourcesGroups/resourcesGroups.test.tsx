import { render, screen } from "@testing-library/react";
import { ResourcesGroups } from "./ResourcesGroups";
import type { AllResources, ResourcesFullDetails } from "@/variables";

const wood: ResourcesFullDetails = {
  id: "wood",
  name: "Wood",
  img: "/",
  description: "this is wood",
  category: "resource",
  isTeleportable: true,
  stackSize: 1,
  enemiesListIds: ["first", "second"],
};

const plank: ResourcesFullDetails = {
  ...wood,
  id: "plank",
  name: "Plank",
};

const copperOre: ResourcesFullDetails = {
  ...wood,
  id: "copper-ore",
  name: "Copper Ore",
};

const copperIngot: ResourcesFullDetails = {
  ...wood,
  id: "copper-ingot",
  name: "Copper Ingot",
};

const mockResources: AllResources = {
  resourcesGroups: [
    {
      title: "Woods",
      ids: ["wood", "plank"],
    },
    {
      title: "Ores & Ingots",
      ids: ["copper-ore", "copper-ingot"],
    },
  ],
  resourcesList: {
    wood,
    plank,
    "copper-ore": copperOre,
    "copper-ingot": copperIngot,
  },
};

const { resourcesGroups, resourcesList } = mockResources;

describe("resource", () => {
  it("resources groups render correctly", async () => {
    render(
      <ResourcesGroups
        resourcesGroups={resourcesGroups}
        resourcesList={resourcesList}
      />,
    );

    const woodTitle = await screen.findByText("Woods");
    expect(woodTitle).toBeTruthy();
    const oreIngotTitle = await screen.findByText("Ores & Ingots");
    expect(oreIngotTitle).toBeTruthy();
    const woodElement = await screen.findByText(wood.name);
    expect(woodElement).toBeTruthy();
    const plankElement = await screen.findByText(plank.name);
    expect(plankElement).toBeTruthy();
    const copperOreElement = await screen.findByText(copperOre.name);
    expect(copperOreElement).toBeTruthy();
    const copperIngotElement = await screen.findByText(copperIngot.name);
    expect(copperIngotElement).toBeTruthy();
    const images = await screen.findAllByRole("img");
    expect(images.length).toBe(Object.keys(resourcesList).length);
  });
});
