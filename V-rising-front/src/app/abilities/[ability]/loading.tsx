import { Skeleton } from "@/components/Skeleton";
import styles from "./page.module.scss";

export default function Loading() {
  return (
    <div className={styles.wrapper}>
      <div className={styles["skeletons-wrapper"]}>
        <Skeleton width="40%" height="20px" />
        <Skeleton width="40%" height="20px" />
        <Skeleton width="100%" height="250px" />
      </div>
      <Skeleton width="200px" height="260px" />
    </div>
  );
}
