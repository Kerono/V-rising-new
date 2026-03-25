import styles from "./page.module.scss";
import { Skeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className={styles.wrapper}>
      <Skeleton height="70vh" />
      <Skeleton height="350px" />
    </div>
  );
}
