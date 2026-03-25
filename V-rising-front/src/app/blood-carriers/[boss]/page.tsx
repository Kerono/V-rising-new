import { BossesIds } from "@/variables";
import Image from "next/image";
import styles from "./page.module.scss";
import { FC } from "react";
import Link from "next/link";
import { getSpecificBoss } from "@/server/actions";
import { AdditionalInfo } from "@/components/AdditionalInfo";
import type { Info } from "@/app/items/[item]/page";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ boss: BossesIds }>;
};

const Page: FC<Props> = async ({ params }) => {
  const { boss } = await params;
  const { searchId, bossesList, skillsList, resourcesList, weaponsList } =
    await getSpecificBoss(boss);
  const currentBoss = bossesList[searchId];

  if (!currentBoss) notFound();

  const { title, description, location, rewards, img, level, region, attacks } =
    currentBoss;
  const info: Info[] = [
    {
      title: "Level",
      value: <div>{level}</div>,
    },
    {
      title: "Location",
      value: <Link href={`/regions`}>{region}</Link>,
    },
  ];

  if (rewards.skills) {
    info.push({
      title: "Unlocked Vampire Powers",
      value: (
        <div className={styles["skills-wrapper"]}>
          {rewards.skills.map((skillId) => {
            const { id, title, img } = skillsList[skillId];
            return (
              <Link key={id} href={`/abilities/${id}`}>
                <div>{title}</div>
                <Image src={img} alt={title} width={30} height={30} />
              </Link>
            );
          })}
        </div>
      ),
    });
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        <div>{description}</div>
        <div>Location</div>
        <div>{location}</div>
        {rewards.skills && (
          <>
            <div>Rewards</div>
            <div className={styles["rewards-wrapper"]}>
              {rewards.skills.map((skillId) => {
                const { id, title, img } = skillsList[skillId];
                return (
                  <Link
                    className={styles["rewards-content"]}
                    href={`/abilities/${id}`}
                    key={id}
                  >
                    <Image src={img} alt={title} width={30} height={30} />
                    <div>{title}</div>
                  </Link>
                );
              })}
            </div>
          </>
        )}
        <div>Drops</div>
        <div className={styles["rewards-wrapper"]}>
          {rewards.drop.map((resourceId) => {
            const { id, img, name } = resourcesList[resourceId];
            return (
              <Link
                className={styles["rewards-content"]}
                href={`/items/${id}`}
                key={id}
              >
                <Image src={img} alt={name} width={30} height={30} />
                <div>{name}</div>
              </Link>
            );
          })}
        </div>
        {rewards.recipes && (
          <>
            <div>Weapons</div>
            <div className={styles["rewards-wrapper"]}>
              {rewards.recipes.map((recipe) => {
                const { title, id, img } = weaponsList[recipe];
                return (
                  <Link
                    className={styles["rewards-content"]}
                    key={id}
                    href={`/weapons/${id}`}
                  >
                    <div>{title}</div>
                    <Image src={img} alt={title} width={20} height={20} />
                  </Link>
                );
              })}
            </div>
          </>
        )}
        <div>Attacks</div>
        <div className={styles["attacks-content"]}>
          {attacks.map((attack, index) => (
            <div key={index}>{attack}</div>
          ))}
        </div>
      </div>

      <AdditionalInfo title={title} imgSrc={img} info={info} />
    </div>
  );
};
export default Page;
