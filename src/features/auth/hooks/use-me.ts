import { useAuthStore } from "@/app/store/auth"
import { useQuery } from "@tanstack/react-query"
import { getMe } from "../get-me"

export const useMe = () => {
    const token = useAuthStore((s) => s.token)
    return useQuery({
        queryKey: ["me"],
        queryFn: getMe,
        enabled: !!token
    })
}