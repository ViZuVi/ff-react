import { api } from "@/shared/api/axios"
import type { ApiRespons } from "@/shared/types/ApiRespons";
import type { User } from "@/shared/types/User";

export const getMe = async (): Promise<ApiRespons<User>> => {
    const { data } = await api.get('/user/show')
    return data
}