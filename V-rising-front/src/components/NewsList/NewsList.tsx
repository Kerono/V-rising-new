"use client";
import type { NewsList as NewsListT } from "@/variables";
import { FC } from "react";
import { NewsCards } from "@/components/NewsCards";
import { useNewsListData } from "@/hooks/useNewsListData";

type Props = {
  initialData: NewsListT[];
  totalCount: number;
};

export const NewsList: FC<Props> = ({ initialData, totalCount }) => {
  const { news, isLoading, loadNextPage } = useNewsListData(initialData);

  return (
    <NewsCards
      newsList={news}
      totalCount={totalCount}
      isLoading={isLoading}
      onLoadMore={loadNextPage}
    />
  );
};
