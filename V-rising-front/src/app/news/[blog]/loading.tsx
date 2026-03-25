import { Skeleton } from "@/components/Skeleton";
import styles from "./page.module.scss";

export default function Loading() {
  return (
    <div className={`${styles.wrapper} ${styles["loading-wrapper"]}`}>
      <Skeleton width="60%" height="200px" />
      <Skeleton width="40%" height="20px" />
      <Skeleton height="300px" />
    </div>
  );
}
