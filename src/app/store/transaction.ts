import type { TransactionDraft } from "@/shared/types/TransactionDraft";
import { useSearchParams } from "react-router";
import { create } from "zustand";

const [searchParams] = useSearchParams()
const spaceId = parseInt(searchParams.get('space')!) // TODO type

type Store = {
    drafts: TransactionDraft[]
    addEmptyDraft: () => void
    cloneDraft: (localId: string) => void
    updateDraft: <K extends keyof TransactionDraft>(
        localId: string,
        field: K,
        value: TransactionDraft[K]
    ) => void
    removeDraft: (localId: string) => void
}

const createEmptyDraft = (): TransactionDraft => ({
    localId: crypto.randomUUID(),
    created_at: new Date().toISOString(),
    amount: 0,
    account_id: null,
    category_id: null,
    space_id: spaceId,
    type: null,
    comment: '',
})

export const useTransactionStore = create<Store>((set) => ({
    drafts: [createEmptyDraft()],
    addEmptyDraft: () =>
        set((state) => ({
            drafts: [...state.drafts, createEmptyDraft()],
        })),
    cloneDraft: (localId) =>
        set((state) => {
            const source = state.drafts.find((d) => d.localId === localId)

            if (!source) return state

            const cloned: TransactionDraft = {
                ...structuredClone(source),
                localId: crypto.randomUUID(),
            }

            return {
                drafts: [...state.drafts, cloned],
            }
        }),
    updateDraft: (localId, field, value) =>
        set((state) => ({
            drafts: state.drafts.map((draft) =>
                draft.localId === localId
                    ? { ...draft, [field]: value }
                    : draft
            ),
        })),

    removeDraft: (localId) =>
        set((state) => ({
            drafts: state.drafts.filter((d) => d.localId !== localId),
        })),
}))