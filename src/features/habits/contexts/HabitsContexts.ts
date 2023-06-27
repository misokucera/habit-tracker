import { User } from "firebase/auth";
import { createContext } from "react";

export type Habit = {
    id: string;
    name: string;
    color: string;
    days: number[];
    description?: string;
};

type HabitsContext = {
    habits: Habit[];
};

export const HabitsContext = createContext<HabitsContext>({
    habits: [],
});
