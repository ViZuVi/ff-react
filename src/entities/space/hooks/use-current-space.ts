import { useQuery } from "@tanstack/react-query";
import { getCurrentSpace } from "../api/get-current-space";
import { useSpaceStore } from "@/entities/space/model/space";

export const useCurrentSpace = () => {
  const currentSpaceId = useSpaceStore((s) => s.currentSpaceId);

  return useQuery({
    queryKey: ["space", currentSpaceId],
    queryFn: ({ queryKey }) => {
      const [, spaceId] = queryKey;
      return getCurrentSpace(spaceId as string);
    },
    enabled: currentSpaceId != null,
    staleTime: 1000 * 60 * 10,
    refetchOnMount: false,
  });
};
