import { api } from "@/shared/api/axios"

export const deleteCategory = async (id: number) => {
    const { data } = await api.delete(`/category/${id}/delete`)
    return data
}