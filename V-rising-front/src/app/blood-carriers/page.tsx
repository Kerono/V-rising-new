import styles from "./page.module.scss";
import Link from "next/link";
import { getBosses } from "@/server/actions";
import { Fragment } from "react";

const Page = async () => {
  const bosses = await getBosses();

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>V Blood Carriers</div>
      <div>
        This page lists all V Blood Carriers. for a list of all non-V Blood
        Enemies, see its respective page. Tracking V Bloods is done through the
        V Blood Menu (default key K) after completing the Journal quest Getting
        Ready for the Hunt. At 50% health, V Bloods spawn at least 3 Blood Orbs,
        restoring 7.5% max health on pick-up. On Relaxed Difficulty they deal
        40% less damage & have 20% less health. On Brutal Difficulty they deal
        70% more damage, have 25% more health, are 3 levels higher and often
        have more abilities and combat behaviours. On Relaxed Difficulty they
        deal 40% less damage & have 20% less health. On Brutal Difficulty they
        deal 70% more damage, have 25% more health, are 3 levels higher and
        often have more abilities and combat behaviours.
      </div>
      <div className={styles["table-wrapper"]}>
        <div>V Blood Carriers</div>
        <div>Location</div>
        <div>Region</div>
        {bosses.map(({ id, name, location, locations_details }) => (
          <Fragment key={id}>
            <Link href={`./blood-carriers/${id}`}>{name}</Link>
            <div className={styles["bosses-location"]}>{locations_details}</div>
            <Link href={`./regions`}>{location}</Link>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default Page;
