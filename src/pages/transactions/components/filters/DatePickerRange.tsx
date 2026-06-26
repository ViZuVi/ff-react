import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ru";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useDateRangeChange } from "@/shared/hooks/useDateRangeChange";
type DateKey = "date_from" | "date_to";

export const DatePickerRange = ({
  from,
  to,
  onChange,
}: {
  from: string;
  to: string;
  onChange: (key: DateKey, v: string) => void;
}) => {
  const [draft, setDraft] = useState<{
    from: Dayjs | null;
    to: Dayjs | null;
  }>({
    from: from ? dayjs(from) : null,
    to: to ? dayjs(to) : null,
  });

  const debouncedDraft = useDebounce(draft, 600);
  useDateRangeChange(debouncedDraft, onChange);

  const changeDate = (key: "from" | "to", v: Dayjs | null) => {
    if (v && !v.isValid()) return;

    setDraft((prev) => ({
      ...prev,
      [key]: v,
    }));
  };

  return (
    <div className="filters__date-picker-range">
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
        <DesktopDatePicker
          disableFuture
          label="Дата от"
          slotProps={{
            textField: {
              size: "small",
            },
          }}
          value={dayjs(draft.from)}
          maxDate={dayjs(to)}
          onChange={(v) => v && changeDate("from", v)}
        />
        <span>-</span>
        <DesktopDatePicker
          disableFuture
          label="Дата до"
          slotProps={{
            textField: {
              size: "small",
            },
          }}
          value={dayjs(draft.to)}
          minDate={dayjs(from)}
          onChange={(v) => v && changeDate("to", v)}
        />
      </LocalizationProvider>
    </div>
  );
};
