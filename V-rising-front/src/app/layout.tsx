import { PropsWithChildren } from "react";
import { FC } from "react";
import { Header } from "@/components/Header";
import { cookies } from "next/headers";
import { darkThemeStyles, lightThemeStyles } from "../variables";
import "./styles.scss";

type Props = {} & PropsWithChildren;

const RootLayout: FC<Props> = async ({ children }) => {
  const cookieStore = await cookies();
  const currentTheme = cookieStore.get("theme")?.value || "light";

  const currentStyles =
    currentTheme === "light" ? lightThemeStyles : darkThemeStyles;

  return (
    <html lang="en" style={currentStyles} data-color-theme={currentTheme}>
      <body>
        <Header initialTheme={currentTheme} />
        <main>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
