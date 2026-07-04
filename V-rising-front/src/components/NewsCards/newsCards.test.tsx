import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NewsCards } from "./NewsCards";
import type { Props as NewsCardProps } from "./NewsCards";

const mockNewsTitle = "test title";

const mockData: NewsCardProps = {
  newsList: [
    { id: "mockId-1", title: mockNewsTitle, info: "test info", img: "-" },
    { id: "mockId-2", title: mockNewsTitle, info: "test info", img: "-" },
  ],
  totalCount: 6,
  isLoading: true,
  onLoadMore: jest.fn(),
};

const {
  newsList: mockNewsList,
  totalCount: mockTotalCount,
  isLoading: mockIsLoading,
  onLoadMore: mockOnLoadMore,
} = mockData;

describe("news", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("check loading state", () => {
    render(
      <NewsCards
        newsList={mockNewsList}
        totalCount={mockTotalCount}
        isLoading={mockIsLoading}
        onLoadMore={mockOnLoadMore}
      />,
    );

    const skeletons = screen.getAllByRole("skeleton");
    expect(skeletons.length).toBeGreaterThan(0);
    const loadingButton = screen.getByRole("button", { name: /loading/i });
    expect(loadingButton.hasAttribute("disabled")).toBeTruthy();
    expect(screen.getAllByText(mockNewsTitle).length).toBe(mockNewsList.length);
  });

  it("correct display and functionality", async () => {
    const user = userEvent.setup();
    render(
      <NewsCards
        newsList={mockNewsList}
        totalCount={mockTotalCount}
        isLoading={false}
        onLoadMore={mockOnLoadMore}
      />,
    );

    expect(screen.getAllByText(mockNewsTitle).length).toBe(mockNewsList.length);
    const addButton = screen.getByRole("button", { name: /add more/i });
    await user.click(addButton);
    expect(mockOnLoadMore).toHaveBeenCalledTimes(1);
  });
});
