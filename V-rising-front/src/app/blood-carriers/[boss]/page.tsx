import Image from "next/image";
import styles from "./page.module.scss";
import { FC, Fragment } from "react";
import Link from "next/link";
import { getBoss } from "@/server/actions";
import { AdditionalInfoCard } from "@/components/AdditionalInfoCard";
import type { Info } from "@/variables";
import { notFound } from "next/navigation";
import { Rewards } from "@/components/Rewards";

type Props = {
  params: Promise<{ boss: string }>;
};

const Page: FC<Props> = async ({ params }) => {
  const { boss: bossId } = await params;

  const boss = await getBoss(bossId);

  if (!boss) notFound();

  const {
    name,
    description,
    location,
    locations_details,
    img,
    level,
    ability,
    weaponsRecipe,
    resources,
    attacks,
  } = boss;

  const cardInfo: Info[] = [
    {
      title: "Level",
      value: <div>{level}</div>,
    },
    {
      title: "Location",
      value: <Link href={`/regions`}>{location}</Link>,
    },
  ];

  if (ability) {
    const { id, name, img } = ability;
    cardInfo.push({
      title: "Unlocked Vampire Powers",
      value: (
        <Link className={styles["skills-wrapper"]} href={`/abilities/${id}`}>
          <div>{name}</div>
          <Image src={img} alt={name} width={30} height={30} />
        </Link>
      ),
    });
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.title}>{name}</div>
        <div>{description}</div>
        <div className={styles.title}>Location</div>
        <div>{locations_details}</div>

        {ability && (
          <>
            <div className={styles.title}>Rewards</div>
            <div className={styles["rewards-wrapper"]}>
              <Rewards
                id={ability.id}
                name={ability.name}
                img={ability.img}
                url={`/abilities/${ability.id}`}
              />
            </div>
          </>
        )}
        <div className={styles.title}>Drops</div>
        <div className={styles["rewards-wrapper"]}>
          {resources.map((resource) => {
            const { id, img, name } = resource;

            return (
              <Fragment key={id}>
                <Rewards
                  id={id}
                  name={name}
                  img={img}
                  url={`/resources/${id}`}
                />
              </Fragment>
            );
          })}
        </div>
        {weaponsRecipe && (
          <>
            <div className={styles.title}>Weapons</div>
            <div className={styles["rewards-wrapper"]}>
              <Rewards
                id={weaponsRecipe.id}
                name={weaponsRecipe.name}
                img={weaponsRecipe.img}
                url={`/weapons/${weaponsRecipe.id}`}
              />
            </div>
          </>
        )}
        <div className={styles.title}>Attacks</div>
        <div className={styles["attacks-content"]}>
          {attacks.map((attack, index) => (
            <div key={index}>{attack}</div>
          ))}
        </div>
      </div>

      <AdditionalInfoCard title={name} imgSrc={img} info={cardInfo} />
    </div>
  );
};
export default Page;
