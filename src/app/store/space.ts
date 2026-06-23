import { create } from "zustand";
import { persist } from "zustand/middleware";

type SpaceState = {
  currentSpaceId: string | null;
  setCurrentSpaceId: (id: string) => void;
};

export const useSpaceStore = create<SpaceState>()(
  persist(
    (set) => ({
      currentSpaceId: null,
      setCurrentSpaceId: (id) => set({ currentSpaceId: id }),
    }),
    {
      name: "space-storage",
    },
  ),
);
