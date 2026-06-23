import { MainActions } from "@/pages/transactions/components/actions/MainActions";
import "./transactions.css";
import { FiltersForm } from "./components/filters/FiltersForm";
import { TransactionsTable } from "./components/table/TransactionsTable";
import { Skeleton } from "@mui/material";
import { NoSpaces } from "./components/NoSpaces";
import { useTransactions } from "@/entities/transaction/hooks/use-transactions";
import { useSpaces } from "@/entities/space/hooks/use-spaces";
import { useDeferredValue, useMemo, useState } from "react";
import { useSpaceStore } from "@/app/store/space";
import type { Filters } from "@/shared/types/Filters";
import dayjs from "dayjs";

export const TransactionsView = () => {
  const { data: spaces, isLoading: spacesLoading } = useSpaces();
  const currentSpaceId = useSpaceStore((s) => s.currentSpaceId);

  const [filters, setFilters] = useState<Omit<Filters, "space_id">>({
    search: "",
    category_id: [] as number[],
    type: "",
    user_id: "",
    account_id: "",
    date_from: dayjs().subtract(1, "month").format("YYYY-MM-DD"),
    date_to: dayjs().format("YYYY-MM-DD"),
  });

  const filtersWithSpace = useMemo(
    () => ({
      ...filters,
      space_id: currentSpaceId,
    }),
    [filters, currentSpaceId],
  );

  const deferredFilters = useDeferredValue(filtersWithSpace);

  const { data: transactions } = useTransactions(deferredFilters);

  const handleChange = <K extends keyof typeof filters>(
    type: K,
    e: (typeof filters)[K],
  ) => {
    setFilters((prev) => ({ ...prev, [type]: e }));
  };

  return spacesLoading ? (
    <>
      <div style={{ display: "flex", gap: "24px" }}>
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={1300}
          height={400}
        />
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={400}
          height={400}
        />
      </div>
    </>
  ) : spaces?.spaces.length ? (
    <div className="transactions-view">
      <div className="transactions-wrapper">
        <MainActions />
        {transactions?.data ? (
          <TransactionsTable rows={transactions.data} />
        ) : (
          ""
        )}
      </div>
      <FiltersForm filters={filters} onChange={handleChange} />
    </div>
  ) : (
    <NoSpaces />
  );
};
