import { useQuery } from "@tanstack/react-query";
import { getSpaces } from "../api/get-spaces";

export const useSpaces = () => {
  return useQuery({
    queryKey: ["spaces"],
    queryFn: getSpaces,
  });
};
