"use client";
import styles from "./news.module.scss";
import { useState, FC } from "react";
import { Card } from "../Card";
import type { NewsList } from "@/variables";
import { getNews } from "@/server/actions";
import { Skeleton } from "../Skeleton";
import { newsPerPage } from "@/variables";
import { range } from "@/utils/range";

type Props = {
  initialData: NewsList[];
  totalCount: number;
};

export const News: FC<Props> = ({ initialData, totalCount }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [news, setNews] = useState<NewsList[]>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  console.log(news);
  const handleClick = async () => {
    setIsLoading(true);
    const nextPage = currentPage + 1;
    const { data } = await getNews(nextPage);
    setCurrentPage(nextPage);
    setNews([...news, ...data]);
    setIsLoading(false);
  };

  const skeletonsForNews =
    totalCount - news.length < newsPerPage
      ? totalCount % newsPerPage
      : newsPerPage;

  return (
    <>
      <div className={styles["cards-container"]}>
        {news.map(({ id, title, img }) => (
          <Card key={id} href={`./news/${id}`} img={img} data={title} />
        ))}
        {isLoading &&
          range(skeletonsForNews).map((index) => (
            <Skeleton key={index} height="195px" />
          ))}
      </div>
      {news.length < totalCount && (
        <button
          disabled={isLoading}
          className={styles.button}
          onClick={handleClick}
        >
          {isLoading ? "loading..." : "add more"}
        </button>
      )}
    </>
  );
};
