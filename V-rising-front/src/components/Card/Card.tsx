import Link from "next/link";
import Image from "next/image";
import styles from "./card.module.scss";
import { FC } from "react";

type Props = {
  href: string;
  img: string;
  data: string;
};

export const Card: FC<Props> = ({ href, img, data }) => {
  return (
    <Link href={href} className={styles.card}>
      <Image
        src={img}
        width={120}
        priority
        height={120}
        className={styles["card-img"]}
        alt={data}
      />
      <div>{data}</div>
    </Link>
  );
};
