import { renderHook } from "@testing-library/react";
import { useNewsListData } from "./useNewsListData";
import type { GetNews, NewsList } from "@/variables";
import { getNews } from "@/server/actions";
import { act } from "react";

jest.mock("../../server/actions");

const initialMockData: NewsList[] = [
  {
    id: "mockId-1",
    title: "initialMockData",
    info: "initialMockData",
    img: "-",
  },
  {
    id: "mockId-2",
    title: "initialMockData",
    info: "initialMockData",
    img: "-",
  },
];

const fetchedMockData: GetNews = {
  data: [
    {
      id: "mockId-3",
      title: "fetchedMockData",
      info: "fetchedMockData",
      img: "-",
    },
    {
      id: "mockId-4",
      title: "fetchedMockData",
      info: "fetchedMockData",
      img: "-",
    },
  ],
  totalCount: 4,
};

const mockedFetchData = jest.mocked(getNews);

describe("hook", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("custom hook correct work", async () => {
    const { result } = renderHook(() => useNewsListData(initialMockData));
    mockedFetchData.mockResolvedValueOnce(fetchedMockData);
    const { loadNextPage } = result.current;
    expect(result.current.news.length).toBe(initialMockData.length);
    await act(async () => {
      return loadNextPage();
    });
    expect(result.current.news.length).toBe(
      initialMockData.length + fetchedMockData.data.length,
    );
  });
});
