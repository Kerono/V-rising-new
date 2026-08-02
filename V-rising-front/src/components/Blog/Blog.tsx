import styles from "./blog.module.scss";
import Image from "next/image";
import { FC } from "react";

export type Props = {
  imgUrl: string;
  title: string;
  info: string;
};

export const Blog: FC<Props> = ({ imgUrl, title, info }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles["image-wrapper"]}>
        <Image
          src={imgUrl}
          alt={title}
          width={"200"}
          height={"200"}
          unoptimized
        />
      </div>
      <div className={styles.title}>{title}</div>
      <div>{info}</div>
    </div>
  );
};
