"use client";
import Link from "next/link";
import { Menu } from "react-feather";
import styles from "./mobileHeader.module.scss";
import { useState } from "react";
import { Overlay } from "@/components/Overlay";

const MobileHeader = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState<boolean>(false);

  function handleClick() {
    setIsOverlayOpen(!isOverlayOpen);
  }

  return (
    <div className={styles.mobile}>
      <Link className={styles["logo-link"]} href="/">
        V Rising
      </Link>
      <button onClick={handleClick} className={styles["img-wrapper"]}>
        <Menu width={20} height={20} />
      </button>

      {isOverlayOpen && <Overlay setIsOverlayOpen={setIsOverlayOpen} />}
    </div>
  );
};

export { MobileHeader };
