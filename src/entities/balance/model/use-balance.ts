import { useQuery } from "@tanstack/react-query";
import { getBalance } from "../model/api/get-balance";

export const useBalance = (currencyId?: number) => {
  return useQuery({
    queryKey: ["balance", currencyId],
    queryFn: () => getBalance(currencyId),
    enabled: !!currencyId,
  });
};
