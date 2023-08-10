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

export const formatDateInPast = (daysPassed: number): string => {
    return getDateInPast(daysPassed).toLocaleDateString(locale, {
        day: "numeric",
        month: "numeric",
        weekday: "short",
    });
};

export const getDifferenceInDays = (
    date1: Date | null,
    date2: Date | null,
): number => {
    return dayjs(date1).diff(date2, "day");
};
