import styles from "./regions.module.scss";
import type { Regions as TRegions } from "@/variables";
import Image from "next/image";
import { FC } from "react";
import { imageUrl } from "@/utils/imageUrl";

export const Regions: FC<TRegions> = ({ img, data }) => {
  const imgUrl = imageUrl(img);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.title}>Locations</div>
        <div>
          The world of V Rising is called Vardoran - it is split into eight
          regions, each with their own unique enemies, trees, plants, resources
          & loot.
        </div>
        {data.map(({ id, title, content }) => (
          <div key={id} className={styles["regions-description"]}>
            <div className={styles.title}>{title}</div>
            <div>{content}</div>
          </div>
        ))}
      </div>
      <div className={styles["image-wrapper"]}>
        <Image
          src={imgUrl}
          alt="regions"
          width={400}
          height={200}
          priority={true}
        />
      </div>
    </div>
  );
};
