import { useState } from "react";
import type { NewsList } from "@/variables";
import { getNews } from "@/server/actions";

export function useNewsListData(initialData: NewsList[]): {
  news: NewsList[];
  isLoading: boolean;
  loadNextPage: () => void;
} {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [news, setNews] = useState<NewsList[]>(initialData);
  const [isLoading, setIsLoading] = useState(false);

  const loadNextPage = async () => {
    setIsLoading(true);
    const nextPage = currentPage + 1;
    const { data } = await getNews(nextPage);
    setCurrentPage(nextPage);
    setNews([...news, ...data]);
    setIsLoading(false);
  };

  return {
    news,
    isLoading,
    loadNextPage,
  };
}
