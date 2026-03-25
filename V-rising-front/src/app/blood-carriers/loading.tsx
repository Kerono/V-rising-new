import styles from "./page.module.scss";
import { Skeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className={styles.wrapper}>
      <Skeleton width="40%" height="20px" />
      <Skeleton height="120px" />
      <Skeleton height="550px" />
    </div>
  );
}
