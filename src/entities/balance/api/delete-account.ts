import { api } from "@/shared/api/axios"

export const deleteAccount = async (id: number) => {
    const { data } = await api.delete(`account/${id}/delete`)
    return data
}