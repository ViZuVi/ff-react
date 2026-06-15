import { api } from "@/shared/api/axios"
import type { ApiRespons } from "@/shared/types/ApiRespons"
import type { BaseSpace } from "@/shared/types/Space"

export const getSpaces = async (): Promise<ApiRespons<BaseSpace[]>> => {
    const { data } = await api.get('/space/my')
    return data
}