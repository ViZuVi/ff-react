import { useSpaceStore } from "@/app/store/space"
import { useSpaces } from "./use-spaces"
import { useEffect } from "react"

export const useInitCurrentSpace = () => {
    const { data } = useSpaces()
    const { currentSpaceId, setCurrentSpaceId } = useSpaceStore()

    useEffect(() => {
        if (!data?.spaces.length) return

        const savedId = currentSpaceId

        const exists = savedId &&
            data.spaces.some((s) => s.id.toString() === savedId)

        if (exists) return

        const firstId = data.spaces[0].id.toString()

        setCurrentSpaceId(firstId)
    }, [data, currentSpaceId, setCurrentSpaceId])
}