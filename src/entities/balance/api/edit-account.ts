import { api } from "@/shared/api/axios"

export const editAccount = async ({ id, name }: { id: number, name: string }) => {
    const { data } = await api.put(`/account/${id}/edit`, { name })
    return data
}