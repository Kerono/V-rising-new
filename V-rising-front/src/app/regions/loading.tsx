import styles from "./page.module.scss";
import { Skeleton } from "@/components/Skeleton";
import { range } from "@/utils/range";
import { Fragment } from "react";
export default function Loading() {
  return (
    <div className={styles.wrapper}>
      <Skeleton height="30px" />
      <Skeleton height="60px" />
      <div className={styles["image-wrapper"]}>
        <Skeleton width="50%" minWidth="200px"></Skeleton>
        <Skeleton width="50%" />
      </div>
      {range(2).map((index) => {
        return (
          <Fragment key={index}>
            <Skeleton height="30px" />
            <Skeleton height="100px" />
          </Fragment>
        );
      })}
    </div>
  );
}
