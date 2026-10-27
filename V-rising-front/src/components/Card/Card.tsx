import Link from "next/link";
import Image from "next/image";
import styles from "./card.module.scss";
import { FC } from "react";

const borderStyles = {
  "--inner-padding": "12px",
  "--outer-border": "18px",
} as React.CSSProperties;

export type Props = {
  href: string;
  img: string;
  data: string;
};

export const Card: FC<Props> = ({ href, img, data }) => {
  return (
    <Link href={href} className={styles.card} style={borderStyles}>
      <Image
        src={img}
        width={100}
        priority
        height={150}
        alt={data}
        className={styles.image}
        unoptimized
      />
      <div>{data}</div>
    </Link>
  );
};
