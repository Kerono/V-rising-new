"use client";
import styles from "./newsCards.module.scss";
import { FC } from "react";
import { Card } from "../Card";
import type { NewsList } from "@/variables";
import { Skeleton } from "../Skeleton";
import { newsPerPage } from "@/variables";
import { range } from "@/utils/range";
import { imageUrl } from "@/utils/imageUrl";

export type Props = {
  newsList: NewsList[];
  totalCount: number;
  isLoading: boolean;
  onLoadMore: () => void;
};

export const NewsCards: FC<Props> = ({
  newsList,
  totalCount,
  isLoading,
  onLoadMore,
}) => {
  const skeletonsForNews =
    totalCount - newsList.length < newsPerPage
      ? totalCount % newsPerPage
      : newsPerPage;

  return (
    <>
      <div className={styles["cards-container"]}>
        {newsList.map(({ id, title, img }) => {
          const imgUrl = imageUrl(img);
          return (
            <Card key={id} href={`./news/${id}`} img={imgUrl} data={title} />
          );
        })}
        {isLoading &&
          range(skeletonsForNews).map((index) => (
            <Skeleton key={index} height="195px" />
          ))}
      </div>
      {newsList.length < totalCount && (
        <button
          disabled={isLoading}
          className={styles.button}
          onClick={onLoadMore}
        >
          {isLoading ? "loading..." : "add more"}
        </button>
      )}
    </>
  );
};
