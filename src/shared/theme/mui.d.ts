import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    gradients: {
      primary: string;
      aurora: string;
    };
  }

  interface PaletteOptions {
    gradients?: {
      primary: string;
      aurora: string;
    };
  }
}
