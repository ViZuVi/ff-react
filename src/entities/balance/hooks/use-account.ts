import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAccount } from "../api/create-account"
import { useSpaceStore } from "@/app/store/space"
import { deleteAccount } from "../api/delete-account"

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

export const useDeleteAccount = () => {
    const queryClient = useQueryClient()
    const currentSpaceId = useSpaceStore((s) => s.currentSpaceId)

    return useMutation({
        mutationFn: deleteAccount,

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