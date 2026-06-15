import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../api/get-transactions";

export const useTransactions = useQuery({
    queryKey: ['transactions'],
    queryFn: () => getTransactions({})
})