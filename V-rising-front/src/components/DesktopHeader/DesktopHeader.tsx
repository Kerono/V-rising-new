"use client";
import Link from "next/link";
import styles from "./desktopHeader.module.scss";
import { Moon, Sun } from "react-feather";
import { linksData } from "@/variables";
import { HeaderLink } from "../HeaderLink";
import React, { FC, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { darkThemeStyles, lightThemeStyles } from "@/variables";

type Props = { initialTheme: string };

const DesktopHeader: FC<Props> = ({ initialTheme }) => {
  const [theme, setTheme] = useState<string>(initialTheme);

  function handleTheme() {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    const root = document.documentElement;
    root.setAttribute("data-color-theme", nextTheme);
    const nextThemeStyles =
      nextTheme === "light" ? lightThemeStyles : darkThemeStyles;
    for (const [key, value] of Object.entries(nextThemeStyles)) {
      root.style.setProperty(key, value);
    }
  }

  useEffect(() => {
    Cookies.set("theme", theme, { expires: 5 });
  }, [theme]);

  return (
    <div className={styles["laptop-and-higher"]}>
      <Link className={styles["logo-link"]} href="/">
        V Rising
      </Link>
      <div className={styles["links-wrapper"]}>
        {linksData.map(({ content, href }, index) => (
          <HeaderLink key={index} content={content} href={href} />
        ))}
      </div>
      <button className={styles["icon-button"]} onClick={handleTheme}>
        {theme === "light" ? (
          <Sun size={"1.4rem"} width={24} height={24} />
        ) : (
          <Moon size={"1.4rem"} />
        )}
      </button>
    </div>
  );
};

export { DesktopHeader };
