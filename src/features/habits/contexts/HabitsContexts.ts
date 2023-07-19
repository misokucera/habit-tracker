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
    loading: boolean;
    reorder: (reorderedHabits: Habit[]) => void;
};

export const HabitsContext = createContext<HabitsContext>({
    habits: [],
    reorder: () => {},
    loading: true,
});
