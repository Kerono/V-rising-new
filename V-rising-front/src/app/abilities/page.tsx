import styles from "./page.module.scss";
import { getAllSkills } from "@/server/actions";
import { Card } from "@/components/Card";

const Page = async () => {
  const { skillsBriefDescription, skillsList } = await getAllSkills();

  const {
    staticInfo: { abilitiesInfo, weaponsSkills },
    abilities,
  } = skillsBriefDescription;

  return (
    <div className={styles.wrapper}>
      <div>{abilitiesInfo.title}</div>
      <div>{abilitiesInfo.description}</div>
      <div>{weaponsSkills.title}</div>
      <div>{weaponsSkills.description}</div>
      <div>{abilities["blood-powers"].title}</div>
      <div className={styles["abilities-wrapper"]}>
        {abilities["blood-powers"].vampirePowerIds.map((power) => {
          const { id, title, img } = skillsList[power];
          return (
            <Card key={id} href={`/abilities/${id}`} img={img} data={title} />
          );
        })}
      </div>
      <div>{abilities["shapeshifting-powers"].title}</div>
      <div className={styles["abilities-wrapper"]}>
        {abilities["shapeshifting-powers"].vampirePowerIds.map((power) => {
          const { id, title, img } = skillsList[power];
          return (
            <Card key={id} href={`/abilities/${id}`} img={img} data={title} />
          );
        })}
      </div>
    </div>
  );
};
export default Page;
