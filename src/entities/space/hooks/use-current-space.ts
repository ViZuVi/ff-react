import { useQuery } from "@tanstack/react-query"
import { getCurrentSpace } from "../api/get-current-space";
import { useSpaceStore } from "@/app/store/space";

export const useCurrentSpace = () => {
    const currentSpaceId = useSpaceStore((s) => s.currentSpaceId)

    return useQuery({
        queryKey: ['space', currentSpaceId],
        queryFn: () => getCurrentSpace(currentSpaceId!),
        enabled: !!currentSpaceId,
    })
}