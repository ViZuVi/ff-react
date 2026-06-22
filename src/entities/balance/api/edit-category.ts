import { api } from "@/shared/api/axios"
import type { CategoryCreate } from "@/shared/types/Category"

export const editCategory = async (cat: CategoryCreate & { id: string }) => {
    const { data } = await api.put(`/category/${cat.id}/edit`, { name: cat.name, type: cat.type })
    return data
}