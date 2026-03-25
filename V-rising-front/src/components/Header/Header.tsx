"use client";
import { Moon, Sun } from "react-feather";
import React, { FC, useEffect } from "react";
import styles from "./header.module.scss";
import Cookies from "js-cookie";
import { darkThemeStyles, lightThemeStyles } from "@/variables";
import { HeaderLink } from "../HeaderLink";
import Link from "next/link";
import { MobileHeader } from "../MobileHeader";

type Props = {
  initialTheme: string;
};

export type LinksData = {
  href: string;
  content: string;
};

export const linksData: LinksData[] = [
  {
    content: "Home",
    href: "/",
  },
  {
    content: "Regions",
    href: "/regions",
  },
  {
    content: "Items",
    href: "/items",
  },
  {
    content: "Abilities",
    href: "/abilities",
  },
  {
    content: "Weapons",
    href: "/weapons",
  },
  {
    content: "Blood carriers V",
    href: "/blood-carriers",
  },
];

export const Header: FC<Props> = ({ initialTheme }: Props) => {
  const [theme, setTheme] = React.useState<string>(initialTheme);

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
    <div className={styles["header-wrapper"]}>
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
            <Sun size={"1.4rem"} />
          ) : (
            <Moon size={"1.4rem"} />
          )}
        </button>
      </div>
      <div className={styles.mobile}>
        <MobileHeader />
      </div>
    </div>
  );
};
