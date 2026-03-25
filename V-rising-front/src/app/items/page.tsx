import styles from "./page.module.scss";
import { getAllResources } from "@/server/actions";
import { Card } from "@/components/Card";

const Page = async () => {
  const data = await getAllResources();
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
                return (
                  <Card key={id} href={`/items/${id}`} data={name} img={img} />
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
