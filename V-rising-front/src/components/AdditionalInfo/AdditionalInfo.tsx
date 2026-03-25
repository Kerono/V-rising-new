import { FC } from "react";
import Image from "next/image";
import type { Info } from "@/app/items/[item]/page";
import styles from "./additionalInfo.module.scss";

type Props = {
  title: string;
  imgSrc: string;
  description?: string;
  info: Info[];
};

const AdditionalInfo: FC<Props> = ({ title, imgSrc, description, info }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{title}</div>
      <Image width={120} height={120} src={imgSrc} alt={title} />
      {description && <div>{description}</div>}
      <div className={styles["info-wrapper"]}>
        {info.map(({ title, value }) => (
          <div className={styles.content} key={title}>
            <div>{title}</div>
            <div>{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { AdditionalInfo };
