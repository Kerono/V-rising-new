import { FC, Fragment } from "react";
import styles from "./weapon.module.scss";
import type { Weapon as WeaponT } from "@/variables";
import Link from "next/link";
import Image from "next/image";
import { imageUrl } from "@/utils/imageUrl";

const titles = ["Skill", "Description", "Tier Requirement"];

type Props = Omit<WeaponT, "id">;

const Weapon: FC<Props> = ({ name, boss, description, skills }) => {
  return (
    <div className={styles.wrapper}>
      <div>{name}</div>
      <div>{description}</div>
      {boss && (
        <div>
          Recipes unlock upon slaying{" "}
          <Link href={`/blood-carriers/${boss.id}`}>{boss.name}</Link>
        </div>
      )}
      <div className={styles["skills-table"]}>
        {titles.map((title, index) => (
          <div className={styles["table-title"]} key={index}>
            {title}
          </div>
        ))}
        {skills.map(({ id, skill, description, tierRequirementWeapon }) => {
          const skillImgUrl = imageUrl(skill.img);
          const weaponImgUrl = imageUrl(tierRequirementWeapon.img);

          return (
            <Fragment key={id}>
              <div>
                <div>{skill.name}</div>
                <Image src={skillImgUrl} alt={id} width={40} height={40} />
              </div>
              <div>{description}</div>
              <div>
                <div>{tierRequirementWeapon.name}</div>
                <Image src={weaponImgUrl} alt={id} width={40} height={40} />
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export { Weapon };
