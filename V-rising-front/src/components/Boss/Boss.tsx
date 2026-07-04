import type { BossResponse, Info } from "@/variables";
import { FC, Fragment } from "react";
import Link from "next/link";
import { imageUrl } from "@/utils/imageUrl";
import Image from "next/image";
import { Rewards } from "@/components/Rewards";
import { AdditionalInfoCard } from "@/components/AdditionalInfoCard";
import styles from "./boss.module.scss";

type Props = Omit<BossResponse, "id">;

export const Boss: FC<Props> = ({
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
}) => {
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
    const imgUrl = imageUrl(img);
    cardInfo.push({
      title: "Unlocked Vampire Powers",
      value: (
        <Link className={styles["skills-wrapper"]} href={`/abilities/${id}`}>
          <div>{name}</div>
          <Image src={imgUrl} alt={name} width={30} height={30} />
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
                img={imageUrl(ability.img)}
                url={`/abilities/${ability.id}`}
              />
            </div>
          </>
        )}
        <div className={styles.title}>Drops</div>
        <div className={styles["rewards-wrapper"]}>
          {resources.map((resource) => {
            const { id, img, name } = resource;
            const imgUrl = imageUrl(img);

            return (
              <Fragment key={id}>
                <Rewards
                  id={id}
                  name={name}
                  img={imgUrl}
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
                img={imageUrl(weaponsRecipe.img)}
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

      <AdditionalInfoCard title={name} imgSrc={imageUrl(img)} info={cardInfo} />
    </div>
  );
};
