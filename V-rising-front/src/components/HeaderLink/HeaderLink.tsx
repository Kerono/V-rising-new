import Link from "next/link";
import type { LinksData } from "@/variables";
import { FC } from "react";
import styles from "./headerLink.module.scss";

type Props = LinksData;

const HeaderLink: FC<Props> = ({ href, content }) => {
  return (
    <Link className={styles.link} href={href}>
      {content}
      <div className={`${styles.link} ${styles.reveal}`}>{content}</div>
    </Link>
  );
};

export { HeaderLink };
