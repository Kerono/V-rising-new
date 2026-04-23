import styles from "./page.module.scss";
import Image from "next/image";
import Link from "next/link";
import { getWeapons } from "@/server/actions";

const Page = async () => {
  const weapons = await getWeapons();
  const weaponsKeys = Object.keys(weapons);

  const additionalConditions = weaponsKeys.filter((d) => weapons[d].boss);

  return (
    <div className={styles.wrapper}>
      <div>This page lists all weapons & their respective stats.</div>
      <div>Weapons</div>
      <div className={styles["cards-container"]}>
        {weaponsKeys.map((key) => {
          const { name, img, id } = weapons[key];
          return (
            <Link className={styles.card} href={`/weapons/${id}`} key={id}>
              <div>{name}</div>
              <Image width={30} height={30} src={img} alt={name} />
            </Link>
          );
        })}
      </div>
      <div className={styles["conditions-wrapper"]}>
        <div className={styles.title}>Additional conditions for receiving</div>
        {additionalConditions.map((key) => {
          const { name, boss, id } = weapons[key];

          if (!boss) return;

          const { id: bossId, name: bossName } = boss;

          return (
            <div key={id} className={styles["weapon-description"]}>
              {boss && (
                <div>
                  {name} recipe unlocks after feeding on{" "}
                  <Link href={`/blood-carriers/${bossId}`}>{bossName}</Link>
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
