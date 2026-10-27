import React, { FC } from "react";
import styles from "./header.module.scss";
import { MobileHeader } from "../MobileHeader";
import { DesktopHeader } from "../DesktopHeader";

type Props = {
  initialTheme: string;
};

export const Header: FC<Props> = ({ initialTheme }) => {
  return (
    <div className={styles["header-wrapper"]}>
      <DesktopHeader initialTheme={initialTheme} />
      <MobileHeader />
    </div>
  );
};
