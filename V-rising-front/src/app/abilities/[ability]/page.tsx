import styles from "./page.module.scss";
import { getAbility } from "@/server/actions";
import type { Info } from "@/app/resources/[resourceId]/page";
import { AdditionalInfo } from "@/components/AdditionalInfo";
import Link from "next/link";
// import { notFound } from "next/navigation";
import { FC } from "react";

type Props = {
  params: Promise<{ ability: string }>;
};

const Page: FC<Props> = async ({ params }) => {
  const { ability } = await params;
  const { title, img, description, type, castTime, notes, getByBossId, boss } =
    await getAbility(ability);

  //TODO add error validation on front side
  // if (!currentSkill) notFound();

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
      <AdditionalInfo title={title} imgSrc={img} info={info} />
    </div>
  );
};

export default Page;
