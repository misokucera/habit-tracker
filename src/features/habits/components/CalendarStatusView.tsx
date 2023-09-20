import {
    Calendar,
    Button,
    Heading,
    CalendarGrid,
    CalendarGridHeader,
    CalendarHeaderCell,
    CalendarGridBody,
    CalendarCell,
    DateValue,
} from "react-aria-components";
import { CalendarDate } from "@internationalized/date";
import { addStatus, removeStatus } from "../services/statuses";
import { useUserId } from "@/features/auth/hooks/useUserId";
import {
    convertCalendarDate,
    getNumberOfDaysFromToday,
    normalizeDate,
} from "@/utils/day";
import { useStatusesContext } from "../contexts/StatusesContexts";
import { useState } from "react";
import classNames from "classnames";
import {
    HiXMark,
    HiChevronDoubleLeft,
    HiChevronDoubleRight,
} from "react-icons/hi2";

const numberOfMonths = 1;

type Props = {
    startDate: Date;
    endDate: Date;
    habitId: string;
};

const CalendarStatusView = ({ habitId, startDate, endDate }: Props) => {
    const { statuses } = useStatusesContext();
    const userId = useUserId();
    const [selectedValue, setSelectedValue] = useState<CalendarDate | null>(
        null,
    );

    const findStatus = (date: Date) => {
        const normalizedDate = normalizeDate(date);

        return (
            statuses.find(
                (status) =>
                    status.habitId === habitId &&
                    status.date.getTime() === normalizedDate.getTime(),
            ) || null
        );
    };

    const handleChange = async (date: Date) => {
        const status = findStatus(date);

        if (status) {
            await removeStatus(userId, status.id);
        } else {
            await addStatus(userId, habitId, date);
        }

        setSelectedValue(null);
    };

    const isDateUnavailable = (date: DateValue) => {
        const convertedDate = convertCalendarDate(date);

        return convertedDate < startDate || convertedDate > endDate;
    };

    const getStatusClasses = (date: CalendarDate) => {
        if (isDateUnavailable(date)) {
            return "text-slate-400";
        }

        const convertedDate = convertCalendarDate(date);

        if (findStatus(convertedDate)) {
            return "focus-visible:ring-lime-200 bg-lime-100 text-lime-700 hover:bg-lime-200 focus-visible:bg-lime-200";
        }

        if (getNumberOfDaysFromToday(convertedDate) > 0) {
            return "focus-visible:ring-red-200 bg-red-100 text-red-700 hover:bg-red-200 focus-visible:bg-red-200";
        }

        return "focus-visible:ring-slate-200 bg-slate-100 text-slate-500 hover:bg-slate-200 focus-visible:bg-slate-200";
    };

    return (
        <Calendar
            aria-label="Appointment date"
            visibleDuration={{ months: numberOfMonths }}
            className="inline-block"
            value={selectedValue}
            isDateUnavailable={isDateUnavailable}
            onChange={(date) => handleChange(convertCalendarDate(date))}
        >
            <div className="mb-5 flex items-center justify-between">
                <Button
                    slot="previous"
                    className="p-2 text-slate-400 hover:text-violet-400 focus-visible:text-violet-400 focus-visible:outline-1 focus-visible:outline-violet-400"
                >
                    <HiChevronDoubleLeft />
                </Button>
                <Heading className="text-xl text-slate-700" />
                <Button
                    slot="next"
                    className="p-2 text-slate-400 hover:text-violet-400 focus-visible:text-violet-400 focus-visible:outline-1 focus-visible:outline-violet-400"
                >
                    <HiChevronDoubleRight />
                </Button>
            </div>
            <CalendarGrid offset={{ months: 0 }}>
                <CalendarGridHeader>
                    {(day) => (
                        <CalendarHeaderCell className="pb-3 text-sm font-normal text-slate-500">
                            {day}
                        </CalendarHeaderCell>
                    )}
                </CalendarGridHeader>
                <CalendarGridBody>
                    {(date) => (
                        <CalendarCell
                            date={date}
                            className={classNames(
                                "m-1 rounded-lg font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                                getStatusClasses(date),
                            )}
                        >
                            {(date) => (
                                <div className="flex h-10 w-10 items-center justify-center text-sm">
                                    {date.isUnavailable ? (
                                        <HiXMark />
                                    ) : (
                                        date.formattedDate
                                    )}
                                </div>
                            )}
                        </CalendarCell>
                    )}
                </CalendarGridBody>
            </CalendarGrid>
        </Calendar>
    );
};

export default CalendarStatusView;
