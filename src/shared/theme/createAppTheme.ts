import { createTheme } from "@mui/material/styles";

import { primitiveColors } from "./tokens/colors";
import { gradients } from "./tokens/gradients";

import { darkScheme } from "./schemes/dark";
import { lightScheme } from "./schemes/light";

import { buttonOverrides } from "../ui/Button/button";
import { inputOverrides } from "../ui/Input/input";
// import { cardOverrides } from './components/card'

export const createAppTheme = (mode: "light" | "dark") => {
  const scheme = mode === "dark" ? darkScheme : lightScheme;

  return createTheme({
    cssVariables: true,

    palette: {
      mode,

      primary: {
        main: primitiveColors.blue500,
      },

      secondary: {
        main: primitiveColors.blue400,
      },

      success: {
        main: primitiveColors.green500,
      },

      warning: {
        main: primitiveColors.yellow500,
      },

      error: {
        main: primitiveColors.red500,
      },

      background: {
        default: scheme.background.body,
        paper: scheme.background.surface,
      },

      text: {
        primary: scheme.text.primary,
        secondary: scheme.text.secondary,
      },

      gradients,
    },

    typography: {
      fontFamily: `
        Inter,
        system-ui,
        sans-serif
      `,
    },

    components: {
      ...buttonOverrides,
      //   ...cardOverrides,
      ...inputOverrides,
    },
  });
};
