import { MainActions } from "@/widgets/main-actions/MainActions";
import { FiltersForm } from "../../features/filter-transactions/ui/FiltersForm";
import { TransactionsTable } from "../../widgets/transaction-table/TransactionsTable";
import { Skeleton, Typography, useMediaQuery } from "@mui/material";
import { NoSpaces } from "../../widgets/no-spaces/NoSpaces";
import { useTransactions } from "@/entities/transaction";
import { useSpaces } from "@/entities/space/model/use-spaces";
import { useDeferredValue, useMemo, useState } from "react";
import { useSpaceStore } from "@/entities/space/model/space-store";
import type { Filters } from "@/shared/types/Filters";
import dayjs from "dayjs";
import styles from "./styles.module.css";
import { useTranslation } from "react-i18next";

export const TransactionsPage = () => {
  const { t } = useTranslation("main");
  const { data: spaces, isLoading: spacesLoading } = useSpaces();
  const currentSpaceId = useSpaceStore((s) => s.currentSpaceId);

  const isMobile = useMediaQuery("(max-width:768px)");

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
      <div className={styles["transactions-view-skeleton"]}>
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={isMobile ? "100%" : 1300}
          height={400}
        />
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={isMobile ? "100%" : 400}
          height={400}
        />
      </div>
    </>
  ) : spaces?.spaces.length ? (
    <div className={styles["transactions-view"]}>
      <div className={styles["transactions-wrapper"]}>
        <MainActions />
        {isMobile && (
          <Typography align="center" variant="h5" sx={{ marginBottom: "12px" }}>
            {t("transactions")}
          </Typography>
        )}
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
