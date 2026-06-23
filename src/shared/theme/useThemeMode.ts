import { useContext } from "react";

import { ThemeModeContext } from "./provider";

export const useThemeMode = () => useContext(ThemeModeContext);
