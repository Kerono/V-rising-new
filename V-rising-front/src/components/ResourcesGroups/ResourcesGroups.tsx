import type { AllResources } from "@/variables";
import { FC } from "react";
import { imageUrl } from "@/utils/imageUrl";
import { Card } from "@/components/Card";
import styles from "./resourcesGroups.module.scss";

export const ResourcesGroups: FC<AllResources> = ({
  resourcesGroups,
  resourcesList,
}) => {
  return (
    <div className={styles.wrapper}>
      {resourcesGroups.map(({ title, ids }) => {
        return (
          <div key={title}>
            <div className={styles.title}>{title}</div>
            <div className={styles.content}>
              {ids.map((id) => {
                const { name, img } = resourcesList[id];
                const imgUrl = imageUrl(img);
                return (
                  <Card
                    key={id}
                    href={`/resources/${id}`}
                    data={name}
                    img={imgUrl}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
