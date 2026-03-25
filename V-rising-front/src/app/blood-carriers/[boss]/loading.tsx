import styles from "./page.module.scss";
import { Skeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className={styles.wrapper}>
      <div className={styles["skeleton-wrapper"]}>
        <Skeleton width="40%" height="20px" />
        <Skeleton height="50px" />
        <Skeleton width="20%" height="20px" />
        <Skeleton height="50px" />
        <Skeleton width="20%" height="20px" />
        <Skeleton height="30px" />
        <Skeleton width="20%" height="20px" />
        <Skeleton height="120px" />
      </div>
      <Skeleton width="200px" height="300px" />
    </div>
  );
}
