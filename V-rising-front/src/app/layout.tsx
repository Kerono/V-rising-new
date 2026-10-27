import { PropsWithChildren } from "react";
import { FC } from "react";
import { Header } from "@/components/Header";
import { cookies } from "next/headers";
import { darkThemeStyles, lightThemeStyles } from "../variables";
import "./styles.scss";
import { Raleway } from "next/font/google";
import { Life_Savers } from "next/font/google";

type Props = {} & PropsWithChildren;

const lifeSavers = Life_Savers({
  weight: "400",
  subsets: ["latin"],
  variable: "--life-savers",
});

const raleway = Raleway({
  weight: "500",
  subsets: ["latin"],
});

const RootLayout: FC<Props> = async ({ children }) => {
  const cookieStore = await cookies();
  const currentTheme = cookieStore.get("theme")?.value || "light";

  const currentStyles =
    currentTheme === "light" ? lightThemeStyles : darkThemeStyles;
  return (
    <html
      lang="en"
      style={currentStyles}
      data-color-theme={currentTheme}
      className={`${raleway.className} ${lifeSavers.variable}`}
    >
      <body>
        <Header initialTheme={currentTheme} />
        <main>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
