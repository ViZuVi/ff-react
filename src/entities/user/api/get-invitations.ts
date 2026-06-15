import { api } from "@/shared/api/axios"
import type { ApiRespons } from "@/shared/types/ApiRespons";
import type { Invitation } from "@/shared/types/Invitation";

type R = {
    inbox: Invitation[];
    outbox: Invitation[];
}

export const getInvitation = async (): Promise<ApiRespons<R>> => {
    const { data } = await api.get('/user/show')
    return data
}