import { render, screen } from "@testing-library/react";
import { Blog } from "./Blog";
import type { Props as BlogProps } from "./Blog";

const testProps: BlogProps = {
  imgUrl: "/",
  title: "Best blog",
  info: "V Rising is FREE Content Update 1.1",
};

const { imgUrl, title, info } = testProps;

describe("blog", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("blog page render correctly", async () => {
    render(<Blog imgUrl={imgUrl} title={title} info={info} />);

    const testTitle = await screen.findByText(title);
    expect(testTitle).toBeTruthy();
    const content = await screen.findByText(info);
    expect(content).toBeTruthy();
    const images = await screen.findByRole("img");
    expect(images).toBeTruthy();
  });
});
