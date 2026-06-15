import { api } from "@/shared/api/axios"

export const logout = async () => {
    await api.post('/user/logout')
}