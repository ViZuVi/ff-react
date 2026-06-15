import { useQuery } from "@tanstack/react-query"
import { getInvitation } from "../api/get-invitations"

export const useInvitation = () => {
    return useQuery({
        queryKey: ["invitations"],
        queryFn: getInvitation,
    })
}