import { Dispatch, FC, SetStateAction } from "react";
import Link from "next/link";
import styles from "./overlay.module.scss";
import { linksData } from "@/components/Header";
import { X } from "react-feather";

type Props = {
  setIsOverlayOpen: Dispatch<SetStateAction<boolean>>;
};

const Overlay: FC<Props> = ({ setIsOverlayOpen }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        {linksData.map(({ href, content }, index) => (
          <button key={index} onClick={() => setIsOverlayOpen(false)}>
            <Link href={href}>{content}</Link>
          </button>
        ))}
        <button
          className={styles["exit-button"]}
          onClick={() => setIsOverlayOpen(false)}
        >
          <X />
        </button>
      </div>
    </div>
  );
};

export { Overlay };
