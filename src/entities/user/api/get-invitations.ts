import { api } from "@/shared/api/axios"
import type { ApiResponse } from "@/shared/types/ApiResponse";
import type { Invitation } from "@/shared/types/Invitation";

type R = {
    inbox: Invitation[];
    outbox: Invitation[];
}

export const getInvitation = async (): Promise<ApiResponse<R>> => {
    const { data } = await api.get('/user/show')
    return data
}