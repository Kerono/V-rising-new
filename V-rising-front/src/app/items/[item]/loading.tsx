import styles from "./page.module.scss";
import { Skeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className={styles.wrapper}>
      <div className={styles["skeleton-wrapper"]}>
        <Skeleton width="40%" height="30px" />
        <Skeleton height="220px" />
      </div>
      <Skeleton width="200px" height="220px" />
    </div>
  );
}
