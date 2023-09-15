import dayjs from "dayjs";

const locale = "en";

export const getDateInPast = (daysPassed: number): Date => {
    return dayjs().subtract(daysPassed, "day").toDate();
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
