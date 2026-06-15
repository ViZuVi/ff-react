import { api } from "@/shared/api/axios"
import type { ApiRespons } from "@/shared/types/ApiRespons"
import type { Space } from "@/shared/types/Space"

export const getCurrentSpace = async (id: string): Promise<ApiRespons<Space>> => {
    const { data } = await api.get(`/space/${id}`)
    return data
}