import styles from "./page.module.scss";
import { Skeleton } from "@/components/Skeleton";
import { range } from "@/utils/range";
import { Fragment } from "react";

const skeletonsNumber = 4;

export default function Loading() {
  return (
    <div className={styles.wrapper}>
      {range(skeletonsNumber).map((index) => (
        <Fragment key={index}>
          <Skeleton width="40%" height="20px" />
          <div className={styles["skeletons-card-wrapper"]}>
            {range(skeletonsNumber).map((index) => (
              <Skeleton key={index} height="175px" />
            ))}
          </div>
        </Fragment>
      ))}
    </div>
  );
}
