import { createTheme } from "@mui/material";
import { createContext, useMemo, useState } from "react";

export const colorPallets = (mode) => {
  return {
    ...(mode === "dark"
      ? {
          light: {
            100: "#fcfcfc",
            200: "#f8f8f8",
            300: "#f5f5f5",
            400: "#f1f1f1",
            500: "#eeeeee",
            600: "#bebebe",
            700: "#8f8f8f",
            800: "#5f5f5f",
            900: "#303030",
          },

          dark: {
            100: "#d5cdd8",
            200: "#ab9ab1",
            300: "#816889",
            400: "#573562",
            500: "#2d033b",
            600: "#24022f",
            700: "#1b0223",
            800: "#120118",
            900: "#09010c",
          },

          primary: {
            100: "#e6ceee",
            200: "#cd9edc",
            300: "#b36dcb",
            400: "#9a3db9",
            500: "#810ca8",
            600: "#670a86",
            700: "#4d0765",
            800: "#340543",
            900: "#1a0222",
          },

          secondary: {
            100: "#fce6f0",
            200: "#f8cde1",
            300: "#f5b3d1",
            400: "#f19ac2",
            500: "#ee81b3",
            600: "#be678f",
            700: "#8f4d6b",
            800: "#5f3448",
            900: "#301a24",
          },

          success: {
            100: "#d2f9d2",
            200: "#a6f3a5",
            300: "#79ec77",
            400: "#4de64a",
            500: "#20e01d",
            600: "#1ab317",
            700: "#138611",
            800: "#0d5a0c",
            900: "#062d06",
          },

          danger: {
            100: "#f0cdcc",
            200: "#e09b99",
            300: "#d16a66",
            400: "#c13833",
            500: "#b20600",
            600: "#8e0500",
            700: "#6b0400",
            800: "#470200",
            900: "#240100",
          },
        }
      : {
          light: {
            100: "#303030",
            200: "#5f5f5f",
            300: "#8f8f8f",
            400: "#bebebe",
            500: "#eeeeee",
            600: "#f1f1f1",
            700: "#f5f5f5",
            800: "#f8f8f8",
            900: "#fcfcfc",
          },

          dark: {
            100: "#09010c",
            200: "#120118",
            300: "#1b0223",
            400: "#24022f",
            500: "#2d033b",
            600: "#573562",
            700: "#816889",
            800: "#ab9ab1",
            900: "#d5cdd8",
          },

          primary: {
            100: "#1a0222",
            200: "#340543",
            300: "#4d0765",
            400: "#670a86",
            500: "#810ca8",
            600: "#9a3db9",
            700: "#b36dcb",
            800: "#cd9edc",
            900: "#e6ceee",
          },

          secondary: {
            100: "#301a24",
            200: "#5f3448",
            300: "#8f4d6b",
            400: "#be678f",
            500: "#ee81b3",
            600: "#f19ac2",
            700: "#f5b3d1",
            800: "#f8cde1",
            900: "#fce6f0",
          },

          success: {
            100: "#062d06",
            200: "#0d5a0c",
            300: "#138611",
            400: "#1ab317",
            500: "#20e01d",
            600: "#4de64a",
            700: "#79ec77",
            800: "#a6f3a5",
            900: "#d2f9d2",
          },

          danger: {
            100: "#240100",
            200: "#470200",
            300: "#6b0400",
            400: "#8e0500",
            500: "#b20600",
            600: "#c13833",
            700: "#d16a66",
            800: "#e09b99",
            900: "#f0cdcc",
          },
        }),
  };
};

export const themeConfig = (mode) => {
  const colors = colorPallets(mode);

  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            primary: {
              main: colors.primary[500],
            },
            secondary: {
              main: colors.secondary[500],
            },
            neutral: {
              dark: colors.dark[700],
              main: colors.dark[500],
              light: colors.dark[100],
            },
            background: {
              default: colors.dark[800],
            },
          }
        : {
            primary: {
              main: colors.primary[500],
            },
            secondary: {
              main: colors.secondary[500],
            },
            neutral: {
              dark: colors.light[700],
              main: colors.light[500],
              light: colors.light[100],
            },
            background: {
              default: colors.light[700],
            },
          }),
    },
    typography: {
      fontFamily: ["roboto", "sans-serif"].join(","),
      fontSize: 10,
      h1: {
        fontFamily: ["roboto", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["roboto", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["roboto", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["roboto", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["roboto", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["roboto", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState(
    localStorage.getItem("techstoreAdminColorMode")
      ? JSON.parse(localStorage.getItem("techstoreAdminColorMode"))
      : "dark"
  );

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prev) => (prev === "light" ? "dark" : "light"));
        localStorage.setItem(
          "techstoreAdminColorMode",
          JSON.stringify(mode === "light" ? "dark" : "light")
        );
      },
    }),
    [mode]
  );

  const theme = useMemo(() => createTheme(themeConfig(mode)), [mode]);

  return [theme, colorMode];
};
