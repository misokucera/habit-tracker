import { CalendarDate, DateValue } from "@internationalized/date";
import dayjs from "dayjs";

const locale = "en";

export const getDateInPast = (daysPassed: number): Date => {
    return dayjs().subtract(daysPassed, "day").toDate();
};

export const getMonthInPast = (daysPassed: number): Date => {
    return dayjs().subtract(daysPassed, "month").toDate();
};

export const normalizeDate = (date: Date): Date => {
    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0);

    return normalizedDate;
};

export const getWeekdayInPast = (daysPassed: number): number => {
    return dayjs(getDateInPast(daysPassed)).day();
};

export const formatShortDate = (date: Date): string => {
    return date.toLocaleDateString(locale, {
        day: "numeric",
        month: "numeric",
    });
};

export const formatLongDate = (date: Date): string => {
    return date.toLocaleDateString(locale, {
        day: "numeric",
        month: "numeric",
        weekday: "long",
    });
};

export const getNumberOfDaysFromToday = (date: Date): number => {
    const today = normalizeDate(new Date());

    return dayjs(today).diff(normalizeDate(date), "day");
};

export const convertCalendarDate = (date: DateValue): Date => {
    return new Date(date.year, date.month - 1, date.day);
};
