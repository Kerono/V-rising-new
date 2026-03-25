import styles from "./page.module.scss";
import { Skeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className={styles.wrapper}>
      <Skeleton width="25%" height="20px" />
      <Skeleton width="30%" height="25px" />
      <Skeleton width="40%" height="25px" />
      <Skeleton height="300px" />
    </div>
  );
}
