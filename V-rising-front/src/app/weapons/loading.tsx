import styles from "./page.module.scss";
import { Skeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className={styles.wrapper}>
      <Skeleton height="20px" width="40%" />
      <Skeleton height="20px" width="40%" />
      <Skeleton height="50px" />
      <Skeleton height="20px" width="40%" />
      <Skeleton height="100px" width="70%" />
    </div>
  );
}
