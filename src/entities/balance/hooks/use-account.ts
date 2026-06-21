import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAccount } from "../api/create-account"
import { useSpaceStore } from "@/app/store/space"

export const useCreateAccount = () => {
    const queryClient = useQueryClient()
    const currentSpaceId = useSpaceStore((s) => s.currentSpaceId)

    return useMutation({
        mutationFn: createAccount,

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['balance'] })
            if (currentSpaceId) {
                queryClient.invalidateQueries({
                    queryKey: ['space', currentSpaceId],
                })
            }
        },
    })
}