import { FC } from "react";
import Link from "next/link";
import styles from "./overlay.module.scss";
import { linksData } from "@/variables";
import { X } from "react-feather";

type Props = {
  setOverlay: (d: boolean) => void;
};

const Overlay: FC<Props> = ({ setOverlay }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        {linksData.map(({ href, content }, index) => (
          <button key={index} onClick={() => setOverlay(false)}>
            <Link href={href}>{content}</Link>
          </button>
        ))}
        <button
          className={styles["exit-button"]}
          onClick={() => setOverlay(false)}
        >
          <X />
        </button>
      </div>
    </div>
  );
};

export { Overlay };
