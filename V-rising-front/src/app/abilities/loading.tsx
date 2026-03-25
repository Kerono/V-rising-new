import styles from "./page.module.scss";
import { Skeleton } from "@/components/Skeleton";
import { range } from "@/utils/range";
import { Fragment } from "react";

const numOfSekeltonsCards = 3;

export default function Loading() {
  return (
    <div className={styles.wrapper}>
      {range(2).map((index) => (
        <Fragment key={index}>
          <Skeleton width="40%" height="30px" />
          <Skeleton height="120px" />
        </Fragment>
      ))}
      <Skeleton width="40%" height="30px" />
      <div className={styles["abilities-wrapper"]}>
        {range(numOfSekeltonsCards).map((index) => (
          <Fragment key={index}>
            <Skeleton height="150px" />
          </Fragment>
        ))}
      </div>
      <Skeleton width="40%" height="30px" />
      <div className={styles["abilities-wrapper"]}>
        {range(numOfSekeltonsCards).map((index) => (
          <Fragment key={index}>
            <Skeleton height="150px" />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
