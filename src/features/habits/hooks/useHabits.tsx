import { useContext } from "react";
import { HabitsContext } from "../contexts/HabitsContexts";

export const useHabits = () => {
    return useContext(HabitsContext);
};
