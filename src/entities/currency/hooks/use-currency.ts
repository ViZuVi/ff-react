import { useQuery } from "@tanstack/react-query";
import { getCurrency } from "../api/get-currency";

export const useCurrency = () => {
  return useQuery({
    queryKey: ["currecies"],
    queryFn: getCurrency,
  });
};
