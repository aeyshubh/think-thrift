//@ts-nocheck
import { extendTheme } from "@chakra-ui/react";
import { lightThemeColors } from "./colors";
import { cardTheme } from "./card";
import { ButtonStyle } from "./button";

const themeConfig = {
  components: {
    Card: cardTheme,
    Button: ButtonStyle,
  },

  // 2. Add your color mode config
  initialColorMode: "dark",
  useSystemColorMode: false,

  semanticTokens: {
    colors: {
      "chakra-body-text": {
        _light: "#FFFFFF", // White text color for better readability in dark mode
      },
      "chakra-body-bg": {
        _light: "linear-gradient(to bottom, #000000, #1A1A1A)", // Gradient background from black to dark gray
      },
    },
  },
  colors: {
    //dynamic primary color based on the dark theme

    green: {
      "50": "#003d02",
      "100": "#005403",
      "200": "#006304",
      "300": "#007b05",
      "400": "#259029",
      "500": "#51a654",
      "600": "#6fb672",
      "700": "#a4d1a6",
      "800": "#cfe6d0",
      "900": "#f3f9f3",
    },
  },
};

export const lightTheme = extendTheme({
  ...themeConfig,
  colors: {
    ...lightThemeColors,
    primary: {
      ...lightThemeColors.primary,
      "50": "#000B3C",
      "100": "#001665",
      "200": "#111F8D",
      "300": "#2428B6",
      "400": "#373EDF",
      "500": "#3237FF",
      "600": "#4C5EFF",
      "700": "#6575FF",
      "800": "#7F8CFF",
      "900": "#98A3FF",
      active: "#004cfc",
    },
  },
  styles: {
    global: {
      body: {
        bg: "linear-gradient(to bottom, #000000, #1A1A1A)", // Gradient background from black to dark gray
        color: "#FFFFFF", // White text color for better readability
      },
      h1: {
        color: "#4C5EFF", // Light blue color for headings
      },
      h2: {
        color: "#4C5EFF", // Light blue color for headings
      },
      h3: {
        color: "#4C5EFF", // Light blue color for headings
      },
      h4: {
        color: "#4C5EFF", // Light blue color for headings
      },
      h5: {
        color: "#4C5EFF", // Light blue color for headings
      },
      h6: {
        color: "#4C5EFF", // Light blue color for headings
      },
    },
  },
  components: {
    ...themeConfig.components,
    Card: {
      ...cardTheme,
      variants: {
        ...cardTheme.variants,
        base: (props) => ({
          container: {
            bg: "linear-gradient(to bottom right, #1A1A1A, #2D2D2F)",
            borderWidth: "1px",
            borderColor: "#2D2D2F",
          },
        }),
        filled: (props) => ({
          container: {
            bg: "linear-gradient(to bottom right, #2D2D2F, #3A3A3C)",
          },
        }),
        baseWithBorder: (props) => ({
          container: {
            bg: "linear-gradient(to bottom right, #1A1A1A, #2D2D2F)",
            borderWidth: "1px",
            borderColor: "#2D2D2F",
          },
        }),
        secondaryBoxShadow: (props) => ({
          container: {
            boxShadow: "inset 0px 0px 100px 5px rgba(76, 94, 255, 0.3)", // Adjusted to blue
            bg: "linear-gradient(to bottom right, #1A1A1A, #2D2D2F)",
            borderWidth: "1px",
            borderColor: "#2D2D2F",
          },
        }),
      },
    },
  },
});
