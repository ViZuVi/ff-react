import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemeMode = "light" | "dark";

interface ThemeStore {
  mode: ThemeMode;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      mode: "dark",

      toggleTheme: () =>
        set((state) => ({
          mode: state.mode === "dark" ? "light" : "dark",
        })),

      setTheme: (mode) => set({ mode }),
    }),
    {
      name: "theme",
    },
  ),
);
