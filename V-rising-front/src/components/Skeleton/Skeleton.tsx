import { FC } from "react";
import styles from "./skeleton.module.scss";

type Props = {
  width?: string;
  height?: string;
  minWidth?: undefined | string;
};

const Skeleton: FC<Props> = ({
  width = "100%",
  height = "200px",
  minWidth = undefined,
}) => {
  return (
    <div
      role={"skeleton"}
      className={styles.card}
      style={{
        width,
        height,
        minWidth,
      }}
    ></div>
  );
};

export { Skeleton };
