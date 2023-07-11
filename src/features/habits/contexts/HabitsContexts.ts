import { createContext } from "react";

export type Habit = {
    id: string;
    name: string;
    days: number[];
    description?: string;
    order: number;
};

type HabitsContext = {
    habits: Habit[];
    reorder: (reorderedHabits: Habit[]) => void;
};

export const HabitsContext = createContext<HabitsContext>({
    habits: [],
    reorder: () => {},
});
