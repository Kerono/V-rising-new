import { FC } from "react";
import styles from "./overlay.module.scss";
import { linksData } from "@/variables";
import { X } from "react-feather";
import { HeaderLink } from "../HeaderLink";
type Props = {
  handleOverlay: (d: boolean) => void;
};

const Overlay: FC<Props> = ({ handleOverlay }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        {linksData.map(({ href, content }, index) => (
          <button key={index} onClick={() => handleOverlay(false)}>
            <HeaderLink content={content} href={href} />
          </button>
        ))}
        <button
          className={styles["exit-button"]}
          onClick={() => handleOverlay(false)}
        >
          <X />
        </button>
      </div>
    </div>
  );
};

export { Overlay };
