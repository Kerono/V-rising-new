import { render } from "@testing-library/react";
import Page from "./page";
import { getAbility } from "@/server/actions";
import { notFound } from "next/navigation";

jest.mock("../../../server/actions");

const mockGetAbilities = jest.mocked(getAbility);
jest.mock("next/navigation", () => ({
  notFound: jest.fn(),
}));

describe("error page", () => {
  it("error page render for weapon page", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    const params = Promise.resolve({ weapon: "axes" });
    const AbilityPage = await Page({ params });
    (mockGetAbilities as jest.Mock).mockImplementationOnce(() =>
      Promise.reject("fail"),
    );
    render(AbilityPage);
    expect(notFound).toHaveBeenCalledTimes(1);
  });
});
