import type { TransactionDraft } from "@/shared/types/TransactionDraft";
import { create } from "zustand";

type Store = {
  drafts: TransactionDraft[];
  addEmptyDraft: (spaceId: number) => void;
  cloneDraft: (localId: string) => void;
  updateDraft: <K extends keyof TransactionDraft>(
    localId: string,
    field: K,
    value: TransactionDraft[K],
  ) => void;
  removeDraft: (localId: string) => void;
  init: (spaceId: number) => void;
};

const createEmptyDraft = (spaceId: number): TransactionDraft => ({
  localId: crypto.randomUUID(),
  created_at: new Date().toISOString(),
  amount: "0",
  account_id: null,
  category_id: null,
  space_id: spaceId,
  type: null,
  comment: "",
});

export const useTransactionStore = create<Store>((set) => ({
  drafts: [],
  init: (spaceId) =>
    set((state) => {
      if (state.drafts.length > 0) {
        return state;
      }

      return {
        drafts: [createEmptyDraft(spaceId)],
      };
    }),
  addEmptyDraft: (spaceId) =>
    set((state) => ({
      drafts: [...state.drafts, createEmptyDraft(spaceId)],
    })),
  cloneDraft: (localId) =>
    set((state) => {
      const source = state.drafts.find((d) => d.localId === localId);

      if (!source) return state;

      const cloned: TransactionDraft = {
        ...structuredClone(source),
        localId: crypto.randomUUID(),
      };

      return {
        drafts: [...state.drafts, cloned],
      };
    }),
  updateDraft: (localId, field, value) =>
    set((state) => ({
      drafts: state.drafts.map((draft) =>
        draft.localId === localId ? { ...draft, [field]: value } : draft,
      ),
    })),

  removeDraft: (localId) =>
    set((state) => ({
      drafts: state.drafts.filter((d) => d.localId !== localId),
    })),
}));
