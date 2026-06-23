import type { Filters } from "@/shared/types/Filters";
import { useCurrentSpace } from "@/entities/space/hooks/use-current-space";
import { FiltersSkeleton } from "./FiltersSkeleton";
import { memo } from "react";
import { CategoriesSelect } from "./CategoriesSelect";
import { SearchInput } from "./SearchInput";
import { TransactionTypeSelect } from "./TransactionTypeSelect";
import { UserSelect } from "./UserSelect";
import { AccountSelect } from "./AccountSelect";
import { DatePickerRange } from "./DatePickerRange";

type FiltersWithoutSpaceId = Omit<Filters, "space_id">;

type Props = {
  filters: FiltersWithoutSpaceId;
  onChange: <K extends keyof FiltersWithoutSpaceId>(
    key: K,
    value: FiltersWithoutSpaceId[K],
  ) => void;
};

const FiltersFormComponent = ({ filters, onChange }: Props) => {
  const { data: space } = useCurrentSpace();
  // TODO if error && is Loading

  const handleChange = <K extends keyof typeof filters>(
    type: K,
    value: (typeof filters)[K],
  ) => {
    onChange(type, value);
  };

  return space?.data ? (
    <div className="filters">
      <SearchInput
        value={filters.search}
        onChange={(e) => handleChange("search", e)}
      />
      <CategoriesSelect
        value={filters.category_id}
        categories={space.data.categories}
        onChange={(e) => handleChange("category_id", e)}
      />
      <TransactionTypeSelect
        value={filters.type}
        onChange={(e) => onChange("type", e)}
      />
      <UserSelect
        users={space.data.users}
        value={filters.user_id}
        onChange={(e) => onChange("user_id", e)}
      />
      <AccountSelect
        accounts={space.data.accounts}
        value={filters.account_id}
        onChange={(e) => onChange("account_id", e)}
      />
      <DatePickerRange
        from={filters.date_from}
        to={filters.date_to}
        onChange={onChange}
      />
    </div>
  ) : (
    <FiltersSkeleton />
  );
};

export const FiltersForm = memo(FiltersFormComponent);
