import { render, screen } from "@testing-library/react";
import { Regions } from "./Regions";
import type { Regions as RegionT } from "@/variables";

const mockRegions: RegionT = {
  img: "/",
  data: [
    {
      id: "farbane-woods",
      title: "Farbane Woods",
      content: "Farbane Woods is first zone the player",
    },
    {
      id: "dunley-farmlands",
      title: "Dunley Farmlands",
      content: "Dunley Farmlands is in the middle section",
    },
  ],
};
const { img, data } = mockRegions;

describe("regions", () => {
  it("regions render correctly", async () => {
    render(<Regions img={img} data={data} />);
    const firstRegionTitle = await screen.findByText("Farbane Woods");
    expect(firstRegionTitle).toBeTruthy();
    const firstRegionContent = await screen.findByText(
      "Farbane Woods is first zone the player",
    );
    expect(firstRegionContent).toBeTruthy();
    const secondRegionTitle = await screen.findByText("Dunley Farmlands");
    expect(secondRegionTitle).toBeTruthy();
    const secondRegionContent = await screen.findByText(
      "Dunley Farmlands is in the middle section",
    );
    expect(secondRegionContent).toBeTruthy();
    const imgElem = await screen.findByRole("img");
    expect(imgElem).toBeTruthy();
  });
});
