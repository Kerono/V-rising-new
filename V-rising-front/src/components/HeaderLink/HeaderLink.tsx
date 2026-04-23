import Link from "next/link";
import type { LinksData } from "@/variables";
import { FC } from "react";
import styles from "./headerLink.module.scss";

type Props = LinksData;

const HeaderLink: FC<Props> = ({ href, content }) => {
  return (
    <div className={styles["links-wrapper"]}>
      <Link className={styles.link} href={href}>
        {content}
      </Link>
      <Link className={`${styles.link} ${styles["bold-link"]}`} href={href}>
        {content}
      </Link>
    </div>
  );
};

export { HeaderLink };
