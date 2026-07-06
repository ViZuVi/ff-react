import { useQuery } from "@tanstack/react-query";
import { getSpaces } from "@/entities/space";

export const useSpaces = () => {
  return useQuery({
    queryKey: ["spaces"],
    queryFn: getSpaces,
  });
};
