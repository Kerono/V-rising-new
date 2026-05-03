import Link from "next/link";
import Image from "next/image";
import type { Details } from "@/variables";
import { FC } from "react";
import styles from "./rewards.module.scss";

type Props = Details & { url: string };
const Rewards: FC<Props> = ({ id, name, img, url }) => {
  return (
    <>
      <Link className={styles["rewards-content"]} href={url} key={id}>
        <Image src={img} alt={name} width={30} height={30} />
        <div>{name}</div>
      </Link>
    </>
  );
};

export { Rewards };
