import { FC } from "react";
import styles from "./ability.module.scss";
import { AdditionalInfoCard } from "@/components/AdditionalInfoCard";
import type { AbilityResponce } from "@/variables";
import type { Info } from "@/variables";
import Link from "next/link";

type Props = { data: AbilityResponce };

const Ability: FC<Props> = ({ data }) => {
  const { title, img, description, type, castTime, notes, getByBossId, boss } =
    data;

  const requirements = getByBossId &&
    boss && {
      id: boss.id,
      bossName: boss.name,
    };

  const info: Info[] = [
    {
      title: "Unlock Requirement",
      value: requirements ? (
        <Link href={`/blood-carriers/${requirements.id}`}>
          {requirements.bossName}
        </Link>
      ) : (
        <div>Default power</div>
      ),
    },
    {
      title: "Type",
      value: <div>{type}</div>,
    },
    {
      title: "Cast time",
      value: <div>{castTime}</div>,
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        <div>Overview</div>
        <div>{description}</div>
        {notes.length > 0 && (
          <>
            <div>Notes</div>
            <ul>
              {notes.map((note, index) => (
                <li key={index}>{note}</li>
              ))}
            </ul>
          </>
        )}
      </div>
      <AdditionalInfoCard title={title} imgSrc={img} info={info} />
    </div>
  );
};

export { Ability };
