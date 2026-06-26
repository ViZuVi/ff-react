import { createContext, type PropsWithChildren, useMemo } from "react";

import { CssBaseline, ThemeProvider } from "@mui/material";

import { createAppTheme } from "./createAppTheme";
import { useThemeStore } from "./theme.store";

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeModeContext = createContext({
  toggleTheme: () => {},
});

export function AppThemeProvider({ children }: PropsWithChildren) {
  const mode = useThemeStore((state) => state.mode);

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
