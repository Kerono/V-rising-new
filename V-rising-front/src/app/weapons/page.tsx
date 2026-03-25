import styles from "./page.module.scss";
import Image from "next/image";
import Link from "next/link";
import type { TypesOfWeaponIds } from "@/variables";
import { getAllWeapons } from "@/server/actions";

const Page = async () => {
  const { weaponsList, bossesList } = await getAllWeapons();
  const weaponsKeys = Object.keys(weaponsList);

  const additionalConditions = weaponsKeys.filter(
    (d) => weaponsList[d as TypesOfWeaponIds].additionalCondition
  );

  return (
    <div className={styles.wrapper}>
      <div>This page lists all weapons & their respective stats.</div>
      <div>Weapons</div>
      <div className={styles["cards-container"]}>
        {weaponsKeys.map((key) => {
          const { title, img, id } = weaponsList[key as TypesOfWeaponIds];
          return (
            <Link className={styles.card} href={`/weapons/${id}`} key={title}>
              <div>{title}</div>
              <Image width={20} height={20} src={img} alt={title} />
            </Link>
          );
        })}
      </div>
      <div className={styles["conditions-wrapper"]}>
        <div className={styles.title}>Additional conditions for receiving</div>
        {additionalConditions.map((key) => {
          const { title, additionalCondition, id } =
            weaponsList[key as TypesOfWeaponIds];

          const currentBoss = additionalCondition && {
            id: bossesList[additionalCondition].id,
            title: bossesList[additionalCondition].title,
          };
          return (
            <div key={id} className={styles["weapon-description"]}>
              {currentBoss?.id && (
                <div>
                  {title} recipe unlocks after feeding on{" "}
                  <Link href={`/blood-carriers/${currentBoss.id}`}>
                    {currentBoss.title}
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
