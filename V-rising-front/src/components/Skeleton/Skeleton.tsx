import { FC } from "react";
import styles from "./skeleton.module.scss";

type Props = {
  width?: string;
  height?: string;
};

const Skeleton: FC<Props> = ({ width = "100%", height = "150px" }) => {
  return (
    <div
      className={styles.card}
      style={{
        width,
        height,
      }}
    ></div>
  );
};

export { Skeleton };
