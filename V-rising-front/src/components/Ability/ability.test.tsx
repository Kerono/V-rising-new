import { render, screen } from "@testing-library/react";
import { Ability } from "./Ability";

const abilityData = {
  title: "Blood hunger",
  img: "blood-hunger.webp",
  description: "Upon activating this buff",
  type: "Buff",
  castTime: "Instant",
  notes: [],
  getByBossId: "tristan-the-vampire-hunter",
  boss: {
    id: "tristan-the-vampire-hunter",
    name: "Tristan the vampire hunter",
  },
};

const {
  title,
  img,
  description: abilityDescription,
  type,
  castTime,
  notes,
  getByBossId,
  boss,
} = abilityData;

describe("ability", () => {
  it("ability page render correctly", async () => {
    render(
      <Ability
        title={title}
        img={img}
        description={abilityDescription}
        type={type}
        castTime={castTime}
        notes={notes}
        getByBossId={getByBossId}
        boss={boss}
      />,
    );

    const bloodHunger = await screen.findAllByText(title);
    expect(bloodHunger.length).toBeGreaterThan(0);
    const description = await screen.findByText(abilityDescription);
    expect(description).toBeTruthy();
    const card = await screen.findByRole("card");
    expect(card).toBeTruthy();
    const bossElem = await screen.findByText(boss.name);
    expect(bossElem).toBeTruthy();
  });
});
