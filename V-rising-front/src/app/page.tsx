import styles from "./page.module.scss";
import { NewsWrapper } from "@/components/NewsWrapper";
import { Suspense } from "react";
import { Skeleton } from "@/components/Skeleton";
import { range } from "@/utils/range";
import { newsPerPage } from "@/variables";

const Home = () => {
  return (
    <div className={styles.wrapper}>
      <div>
        V Rising is an open world survival game developed and published by
        Stunlock Studios and released on May 17, 2022. Awaken as a vampire. Hunt
        for blood in nearby settlements to restore your strength and avoid the
        scorching sun to survive. V Rising is an open-world top-down hack n
        slash sandbox survival game developed and published by Stunlock Studios.
      </div>
      <div>
        It was released in Early Access on Steam for Microsoft Windows on May
        17, 2022. As part of V Risings first Halloween Event, the game was first
        made free-to-play from October 28th to November 1st, 2022, and later
        again from September 12th to September 16th, 2024.
      </div>
      <div>
        A year after its early access release on May 17th, 2023, it received its
        first major update: The Secrets of Gloomrot.
      </div>
      <div>
        The latest Update 1.1: Invaders of Oakveil has been the biggest to date,
        reworking many of the game`s systems and combat stats. It released on
        April 28th, 2025.
      </div>
      <div>
        Awaken after hundreds of years of slumber, weakened and thirsty for
        blood. Gather a clan of allies online or play the part of the lone wolf
        as you explore a vast open world of dark horrors and, worse: the deadly
        sunlight. Raise a mighty castle worthy of your name, and convert the
        most promising humans into thralls to serve within it. Pillage villages,
        raid bandit camps and traverse the territories of supernatural beasts.
        Drink their blood to steal their knowledge and power to become the
        greatest predator of them all. In a world of conflict, only one vampire
        shall reign supreme. Dare you challenge the throne of Dracula?
      </div>
      <div className={styles.title}>Latest news</div>
      <Suspense
        fallback={
          <div className={styles["cards-container"]}>
            {range(newsPerPage).map((index) => (
              <Skeleton key={index} height="195px" />
            ))}
          </div>
        }
      >
        <NewsWrapper />
      </Suspense>
    </div>
  );
};

export default Home;
