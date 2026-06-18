import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ru';
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { useEffect, useState } from 'react';
import { useDebounce } from '@/shared/hooks/useDebounce';

type DateKey = 'date_from' | 'date_to'

export const DatePickerRange = ({ from, to, onChange }: { from: string, to: string, onChange: (key: DateKey, v: string) => void }) => {

    const [draft, setDraft] = useState<{
        from: Dayjs | null;
        to: Dayjs | null;
    }>({
        from: from ? dayjs(from) : null,
        to: to ? dayjs(to) : null,
    });

    const debouncedDraft = useDebounce(draft, 600);

    useEffect(() => {
        const isRangeValid =
            draft.from &&
            draft.to &&
            draft.from.isValid() &&
            draft.to.isValid() &&
            !draft.from.isAfter(draft.to);

        if (debouncedDraft.from && debouncedDraft.from.isValid() && isRangeValid) {
            onChange('date_from', debouncedDraft.from.format('YYYY-MM-DD'));
        } else if (debouncedDraft.from === null) {
            onChange('date_from', '');
        }

        if (debouncedDraft.to && debouncedDraft.to.isValid() && isRangeValid) {
            onChange('date_to', debouncedDraft.to.format('YYYY-MM-DD'));
        } else if (debouncedDraft.to === null) {
            onChange('date_to', '');
        }
    }, [debouncedDraft]);

    const changeDate = (key: 'from' | 'to', v: Dayjs | null) => {
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
                    value={dayjs(draft.from)}
                    maxDate={dayjs(to)}
                    onChange={(v) => v && changeDate('from', v)}
                />
                <span>-</span>
                <DesktopDatePicker
                    disableFuture
                    label="Дата до"
                    value={dayjs(draft.to)}
                    minDate={dayjs(from)}
                    onChange={(v) => v && changeDate('to', v)}
                />
            </LocalizationProvider>
        </div>
    )
}
