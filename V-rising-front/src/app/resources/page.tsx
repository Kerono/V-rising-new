import styles from "./page.module.scss";
import { getResources } from "@/server/actions";
import { Card } from "@/components/Card";
import { imageUrl } from "@/utils/imageUrl";

const Page = async () => {
  const data = await getResources();
  const { resourcesGroups, resourcesList } = data;

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
export default Page;
