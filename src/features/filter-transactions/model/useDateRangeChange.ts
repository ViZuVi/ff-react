import type { Dayjs } from "dayjs";
import { useEffect, useRef } from "react";

type DateKey = "date_from" | "date_to";

export const useDateRangeChange = (
  debouncedDraft: {
    from: Dayjs | null;
    to: Dayjs | null;
  },
  onChange: (key: DateKey, v: string) => void,
) => {
  const prevRef = useRef(debouncedDraft);

  useEffect(() => {
    const prev = prevRef.current;
    const curr = debouncedDraft;

    const isValid =
      curr.from &&
      curr.to &&
      curr.from.isValid() &&
      curr.to.isValid() &&
      !curr.from.isAfter(curr.to);

    // from
    if (curr.from !== prev.from) {
      onChange(
        "date_from",
        curr.from && isValid ? curr.from.format("YYYY-MM-DD") : "",
      );
    }

    // to
    if (curr.to !== prev.to) {
      onChange(
        "date_to",
        curr.to && isValid ? curr.to.format("YYYY-MM-DD") : "",
      );
    }

    prevRef.current = curr;
  }, [debouncedDraft, onChange]);
};
