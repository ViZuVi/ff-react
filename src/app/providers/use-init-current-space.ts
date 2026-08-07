import { useSpaceStore, useSpaces } from "@/entities/space";
import { useEffect } from "react";

export const getInitialSpaceId = (
  spaces: Array<{ id: number | string }>,
  currentSpaceId: string | null,
) => {
  if (!spaces.length) {
    return null;
  }

  const exists =
    currentSpaceId &&
    spaces.some((space) => space.id.toString() === currentSpaceId);

  if (exists) {
    return currentSpaceId;
  }

  return spaces[0].id.toString();
};

export const useInitCurrentSpace = () => {
  const { data } = useSpaces();
  const { currentSpaceId, setCurrentSpaceId } = useSpaceStore();

  useEffect(() => {
    if (!data?.spaces.length) return;

    const initialSpaceId = getInitialSpaceId(data.spaces, currentSpaceId);

    if (initialSpaceId && initialSpaceId !== currentSpaceId) {
      setCurrentSpaceId(initialSpaceId);
    }
  }, [data, currentSpaceId, setCurrentSpaceId]);
};
