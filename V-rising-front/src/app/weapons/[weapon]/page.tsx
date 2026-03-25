import { FC, Fragment } from "react";
import styles from "./page.module.scss";
import type { TypesOfWeaponIds } from "@/variables";
import Image from "next/image";
import Link from "next/link";
import { getSpecificWeapon } from "@/server/actions";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    weapon: TypesOfWeaponIds;
  }>;
};

const titles = ["Skill", "Description", "Tier Requirement"];

const Page: FC<Props> = async ({ params }) => {
  const { weapon } = await params;
  const { searchId, weaponsList, bossesList } = await getSpecificWeapon(weapon);
  const currentWeapon = weaponsList[searchId];

  if (!currentWeapon) notFound();

  const { title, bonuses, skills, additionalCondition } = currentWeapon;

  const dropFrom = additionalCondition && bossesList[additionalCondition];

  return (
    <div className={styles.wrapper}>
      <div>{title}</div>
      <div>{bonuses}</div>
      {dropFrom && (
        <div>
          Recipes unlock upon slaying{" "}
          <Link href={`/blood-carriers/${dropFrom.id}`}>{dropFrom.title}</Link>
        </div>
      )}
      <div className={styles["skills-table"]}>
        {titles.map((title, index) => (
          <div className={styles["table-title"]} key={index}>
            {title}
          </div>
        ))}
        {skills.map(({ id, skill, description, tierRequirement }) => {
          return (
            <Fragment key={id}>
              <div>
                <div>{skill.info}</div>
                <Image
                  src={skill.img}
                  alt={skill.info}
                  width={40}
                  height={40}
                />
              </div>
              <div>{description}</div>
              <div>
                <div>{tierRequirement.info}</div>
                <Image
                  src={tierRequirement.img}
                  alt={tierRequirement.info}
                  width={40}
                  height={40}
                />
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};
export default Page;
