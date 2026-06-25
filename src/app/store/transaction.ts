import type { TransactionDraft } from "@/shared/types/TransactionDraft";
import dayjs from "dayjs";
import { create } from "zustand";

type Store = {
  drafts: TransactionDraft[];
  addEmptyDraft: (
    spaceId: number,
    type: 0 | 1,
    accountId: number,
    categoryId: number,
  ) => void;
  cloneDraft: (localId: string) => void;
  updateDraft: <K extends keyof TransactionDraft>(
    localId: string,
    field: K,
    value: TransactionDraft[K],
  ) => void;
  removeDraft: (localId: string) => void;
  init: (
    spaceId: number,
    type: 0 | 1,
    accountId: number,
    categoryId: number,
  ) => void;
  clear: () => void;
};

const createEmptyDraft = (
  spaceId: number,
  type: 0 | 1,
  accountId: number,
  categoryId: number,
): TransactionDraft => ({
  localId: crypto.randomUUID(),
  created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
  amount: "0",
  account_id: accountId,
  category_id: categoryId,
  space_id: spaceId,
  type: type,
  comment: "",
});

export const useTransactionStore = create<Store>((set) => ({
  drafts: [],
  init: (spaceId, type, accountId, categoryId) =>
    set((state) => {
      if (state.drafts.length > 0) {
        return state;
      }

      return {
        drafts: [createEmptyDraft(spaceId, type, accountId, categoryId)],
      };
    }),
  addEmptyDraft: (spaceId, type, accountId, categoryId) =>
    set((state) => ({
      drafts: [
        ...state.drafts,
        createEmptyDraft(spaceId, type, accountId, categoryId),
      ],
    })),
  cloneDraft: (localId) =>
    set((state) => {
      const source = state.drafts.find((d) => d.localId === localId);

      if (!source) return state;

      const cloned: TransactionDraft = {
        ...structuredClone(source),
        localId: crypto.randomUUID(),
        created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
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

  clear: () => set({ drafts: [] }),
}));
