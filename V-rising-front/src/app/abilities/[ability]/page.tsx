import styles from "./page.module.scss";
import { getSpecificSkill } from "@/server/actions";
import type { SkillsFullInfoIds } from "@/variables";
import type { Info } from "@/app/items/[item]/page";
import { AdditionalInfo } from "@/components/AdditionalInfo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FC } from "react";

type Props = {
  params: Promise<{ ability: SkillsFullInfoIds }>;
};

const Page: FC<Props> = async ({ params }) => {
  const { ability } = await params;
  const { searchId, skillsList, bossesList } = await getSpecificSkill(ability);

  const currentSkill = skillsList[searchId];

  if (!currentSkill) notFound();

  const { title, img, description, notes, unlock, type, castTime } =
    currentSkill;

  const requirements = unlock && {
    bossName: bossesList[unlock].title,
    id: bossesList[unlock].id,
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
        {notes && (
          <>
            <div>{notes.title}</div>
            <ul>
              {notes.content.map((note, index) => (
                <li key={index}>{note}</li>
              ))}
            </ul>
          </>
        )}
      </div>
      <AdditionalInfo title={title} imgSrc={img} info={info} />
    </div>
  );
};

export default Page;
