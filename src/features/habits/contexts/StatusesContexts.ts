import { createContext } from "react";

export type Status = {
    id: string;
    habitId: string;
    date: Date;
};

type StatusesContext = {
    statuses: Status[];
    lastSelectedDays: number;
};

export const StatusesContext = createContext<StatusesContext>({
    statuses: [],
    lastSelectedDays: 0,
});
