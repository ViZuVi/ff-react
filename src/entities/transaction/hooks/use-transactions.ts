import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../api/get-transactions";

export const useTransactions = () => {
    return useQuery({
        queryKey: ['transactions'],
        queryFn: () => getTransactions({space_id: 31})
    })
}