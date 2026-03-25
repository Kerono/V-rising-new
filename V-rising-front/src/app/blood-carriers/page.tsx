import styles from "./page.module.scss";
import Link from "next/link";
import { getBriefDescriptionBosses } from "@/server/actions";
import { Fragment } from "react";

const Page = async () => {
  const { bossesList, briefDecriptionBosses } =
    await getBriefDescriptionBosses();
  const { description, title, bosesIds } = briefDecriptionBosses;

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{title}</div>
      <div>{description}</div>
      <div className={styles["table-wrapper"]}>
        <div>V Blood Carriers</div>
        <div>Location</div>
        <div>Region</div>
        {bosesIds.map((bossId) => {
          const { id, title, location, region } = bossesList[bossId];
          return (
            <Fragment key={id}>
              <Link href={`./blood-carriers/${id}`}>{title}</Link>
              <div>{location}</div>
              <Link href={`./regions`}>{region}</Link>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
