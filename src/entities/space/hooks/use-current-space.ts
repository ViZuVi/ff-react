import { useQuery } from "@tanstack/react-query"
import { useSpaces } from "./use-spaces"
import { useMemo } from "react";
import { getCurrentSpace } from "../api/get-current-space";

export const useCurrentSpace = () => {
    const { data: spacesData } = useSpaces();

    const selectedSpaceId = useMemo(() => {
        if (!spacesData?.data.length) {
            return null
        }

        const savedId = localStorage.getItem('spaceId')

        const exists = spacesData.data.some(
            space => space.id.toString() === savedId
        )

        if (exists) return savedId

        const firtsId = spacesData.data[0].id.toString()
        localStorage.setItem('spaceId', firtsId)

    }, [spacesData])

    useQuery({
        queryKey: ['space', selectedSpaceId],
        queryFn: () => getCurrentSpace(selectedSpaceId!),
        enabled: !!selectedSpaceId,
    })
}